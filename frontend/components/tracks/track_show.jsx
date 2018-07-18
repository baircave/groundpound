import React from 'react';
import NavBar from '../main_page/navbar';
import { connect } from 'react-redux';
import { fetchTrack } from '../../actions/track_actions';
import { trackAgeFromMs, generateRGB, makeGradient } from '../../util/helpers';
import AudioFooter from '../audio_footer/audio_footer';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import CommentForm from '../comments/comment_form'

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

  playPauseTrack() {
    this.props.togglePlayPause();
    this.props.receiveCurTrack(this.props.track.id);
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
    if (this.props.playing) {
      playPauseIcon = <img src={window.pause}></img>;
    } else {
      playPauseIcon = <img src={window.play_button}></img>;
    }
    return (
      <div className="mainWrapper">
        <NavBar></NavBar>
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
                <img className="albumArt" src={track.artwork_file}></img>
              </div>
            </section>
          </div>
          <div className="commentsWrapper">
            <CommentForm trackId={track.id}></CommentForm>
            <div className="trackDescription">
              <p>{track.description}</p>
            </div>
            <div className="comments"></div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.match.params.id] || {};
  const userId = track.artist_id;
  return {
    track,
    user: state.entities.users[userId] || {},
    playing: state.ui.playbar.playing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
    receiveCurTrack: (trackId) => dispatch(receiveCurTrack(trackId)),
    togglePlayPause: () => dispatch(togglePlayPause())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
