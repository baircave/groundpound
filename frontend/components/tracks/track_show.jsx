import React from 'react';
import { connect } from 'react-redux';
import { fetchTrack, deleteTrack } from '../../actions/track_actions';
import { trackAgeFromMs, generateRGB, makeGradient } from '../../util/helpers';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import CommentForm from '../comments/comment_form';
import CommentIndex from '../comments/comment_index';
import { openModal } from '../../actions/modal_actions';
import Modal from '../modal';
import { playPauseTrack } from '../../util/helpers';

class TrackShow extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.playPauseTrack = playPauseTrack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    makeGradient.call(this);
    this.props.fetchTrack(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.props.fetchTrack(this.props.match.params.id);
    }
  }

  handleDelete() {
    this.props.deleteTrack(this.props.track.id);
    this.props.history.push("/");
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
      deleteButton = (<button onClick={this.handleDelete} className="trans-button">
        <i className="fa fa-trash" aria-hidden="true"></i> Delete track</button>);
    }
    return (
      <div className="main-wrapper">
        <Modal artworkUrl={track.artwork_file} title={track.title}/>
        <div className="track-show-page">
          <div className="playback-wrapper">
            <div className="gradient-wrapper">
              <canvas className="canvas" ref={this.canvasRef} width="300" height="300"></canvas>
            </div>
            <section className="playback-contents">
              <div className="throw-left-right">
                <button className="play-button"
                  onClick={this.playPauseTrack}>
                  {playPauseIcon}
                </button>
                <div className="name-and-title">
                  <h3>{this.props.user.nickname}</h3>
                  <h2>{track.title}</h2>
                </div>
              </div>
              <div className="throw-left-right">
                <h4 className="track-age">{trackAge}</h4>
                <img className="album-art"
                  src={track.artwork_file}
                  onClick={() => this.props.openModal("viewArtwork")}></img>
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

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
