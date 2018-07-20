import React from 'react';
import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import { trackAgeFromMs, generateRGB, makeGradient } from '../../util/helpers';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import CommentForm from '../comments/comment_form';
import CommentIndex from '../comments/comment_index';
import { openModal } from '../../actions/modal_actions';
import Modal from '../modal';

class TrackShow extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.playPauseTrack = this.playPauseTrack.bind(this);
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

  playPauseTrack() {
    const track = this.props.track;
    const playbar = this.props.playbar;
    if (playbar.playing) {
      if (playbar.currentlyPlayingId === track.id.toString()) {
        this.props.togglePlayPause(false);
      } else {
        this.props.togglePlayPause(true);
        this.props.receiveCurTrack(track.id.toString());
      }
    } else {
      this.props.togglePlayPause(true);
      this.props.receiveCurTrack(track.id.toString());
    }
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

    return (
      <div className="mainWrapper">
        <Modal artworkUrl={track.artwork_file} title={track.title}/>
        <div className="showPage">
          <div className="playbackWrapper">
            <div className="gradientWrapper">
              <canvas className="canvas" ref={this.canvasRef} width="300" height="300"></canvas>
            </div>
            <section className="playbackContents">
              <div className="throwLeftRight">
                <button className="playButton"
                  onClick={this.playPauseTrack}>
                  {playPauseIcon}
                </button>
                <div className="nameAndTitle">
                  <h3>{this.props.user.nickname}</h3>
                  <h2>{track.title}</h2>
                </div>
              </div>
              <div className="throwLeftRight">
                <h4 className="trackAge">{trackAge}</h4>
                <img className="albumArt"
                  src={track.artwork_file}
                  onClick={() => this.props.openModal("viewArtwork")}></img>
              </div>
            </section>
          </div>
          <div className="commentsWrapper">
            <CommentForm trackId={track.id}></CommentForm>
            <div className="trackDescription">
              <p>{track.description}</p>
            </div>
            <CommentIndex commentIds={track.comment_ids}/>
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
    playbar: state.ui.playbar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
    receiveCurTrack: (trackId) => dispatch(receiveCurTrack(trackId)),
    togglePlayPause: (bool) => dispatch(togglePlayPause(bool)),
    openModal: (modal) => dispatch(openModal(modal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
