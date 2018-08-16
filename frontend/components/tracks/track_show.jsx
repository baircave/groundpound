import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTrack, deleteTrack } from '../../actions/track_actions';
import { trackAgeFromMs, generateRGB, imageLoaded } from '../../util/helpers';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import CommentForm from '../comments/comment_form';
import CommentIndex from '../comments/comment_index';
import { openModal } from '../../actions/modal_actions';
import Modal from '../modal';
import { playPauseTrack } from '../../util/helpers';

class TrackShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disableDelete: false,
      opacityClass: "",
      waveform: null
    };
    const randRGB = generateRGB();
    this.randomCoverGradient = `linear-gradient(45deg, ${randRGB}, #43c3d3)`;
    this.randomArtGradient = `linear-gradient(45deg, #43c3d3, ${randRGB})`;
    this.canvasRef = React.createRef();
    this.playPauseTrack = playPauseTrack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchTrack(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    // if (this.props.track.track_file != prevProps.track.track_file) {
    //   this.setState({waveform: WaveSurfer.create({
    //     container: '#waveform'
    //   }).load(this.props.track.track_file)});
    // }

    if (prevProps.match.params.id != this.props.match.params.id) {
      this.setState({opacityClass: ""});
      this.props.fetchTrack(this.props.match.params.id);
    }
  }

  handleDelete() {
    this.setState({disableDelete: true});
    const userId = this.props.user.id;
    this.props.deleteTrack(this.props.track.id).then(() => {
      this.props.history.push(`/users/${userId}`);
    });
  }

  render() {
    const track = this.props.track;

    const d1 = new Date(track.created_at);
    const d2 = new Date();
    let trackAge = "";
    if (d2 - d1) {
      trackAge = trackAgeFromMs(d2 - d1) || "";
    }

    let playPauseIcon;
    if (this.props.playbar.playing &&
      this.props.track.id === parseInt(this.props.playbar.currentlyPlayingId)) {
      playPauseIcon = <img src={window.pause}></img>;
    } else {
      playPauseIcon = <img src={window.play_button}></img>;
    }

    let deleteButton = null;
    if (this.props.sessionId === track.artist_id) {
      deleteButton = (<button
        onClick={this.handleDelete}
        className="trans-button"
        disabled={this.state.disableDelete}>
        <i className="fa fa-trash" aria-hidden="true"></i> Delete track</button>);
    }

    const artClassnames = `album-art opacity-fade ${this.state.opacityClass}`;

    return (
      <div className="main-wrapper">
        <Modal artworkUrl={track.artwork_file} title={track.title}/>
        <div className="track-show-page">
          <div className="playback-wrapper">
            <div className="gradient-cover"
              style={ { background: this.randomCoverGradient}}></div>
            <section className="playback-contents">
              <div className="throw-left-right">
                <div id="waveform"></div>
                <div className="play-button"
                  onClick={this.playPauseTrack}>
                  {playPauseIcon}
                </div>
                <div className="name-and-title">
                  <h3 className="clickable"
                    onClick={() => this.props.history.push(`/users/${this.props.user.id}`)}>
                    {this.props.user.nickname}</h3>
                  <h2>{track.title}</h2>
                </div>
              </div>
              <div className="throw-left-right">
                <h4 className="track-age">{trackAge}</h4>
                <div className="album-art-gradient"
                  style={ {background: this.randomArtGradient}}>
                  <img className={artClassnames}
                    src={track.artwork_file}
                    onLoad={imageLoaded.bind(this)}
                    onClick={() => this.props.openModal("viewArtwork")}></img>
                </div>
              </div>
            </section>
          </div>
          <div className="comments-wrapper">
            <CommentForm trackId={track.id}></CommentForm>
            {deleteButton}
            <div className="track-description">
              <p>{track.description}</p>
            </div>
            <CommentIndex trackId={track.id} commentIds={track.comment_ids}/>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.match.params.id] || { comment_ids: [] };
  return {
    track,
    user: state.entities.users[track.artist_id] || {},
    sessionId: state.session.id,
    playbar: state.ui.playbar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
    receiveCurTrack: (trackId) => dispatch(receiveCurTrack(trackId)),
    togglePlayPause: (bool) => dispatch(togglePlayPause(bool)),
    openModal: (modal) => dispatch(openModal(modal)),
    deleteTrack: (trackId) => dispatch(deleteTrack(trackId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackShow));
