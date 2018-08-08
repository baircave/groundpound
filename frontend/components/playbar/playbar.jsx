import React from 'react';
import { connect } from 'react-redux';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import { secondsToTimeString, getMouse } from '../../util/helpers';
import { withRouter } from 'react-router-dom';

class AudioFooter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curTrackTime: 0,
      volumeLevel: 0.5,
      prevVol: 0.5,
      progPercentage: 0
    };
    this.audioRef = React.createRef();
    this.audioEl = this.audioRef.current;
    this.updateTime = this.updateTime.bind(this);
    this.seekToClick = this.seekToClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keypress", (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        this.playPauseTrack.call(this);
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.audioRef.current && !this.audioEl) {
      this.audioEl = this.audioRef.current;
    } else if (!this.audioRef.current) {
      return;
    }
    this.loadNewTrack.call(this, prevProps);
    this.playPauseAudioEl.call(this, prevProps);
  }

  playPauseAudioEl(prevProps) {
    if (prevProps.playbar.playing !== this.props.playbar.playing) {
      if (this.props.playbar.playing) {
        this.audioEl.volume = this.state.volumeLevel;
        this.audioEl.play();
      } else {
        this.audioEl.pause();
      }
    }
  }

  loadNewTrack(prevProps) {
    let trackDidChange;
    const isFirstPlayedTrack = (!prevProps.track && this.props.track);
    if (!isFirstPlayedTrack) trackDidChange = prevProps.track.id !== this.props.track.id;
    if (isFirstPlayedTrack || trackDidChange) {
      this.audioEl.src = this.props.track.track_file;
      this.audioEl.load();
      if (!this.props.playbar.playing) {
        this.audioEl.pause();
      }
    }
  }

  seekToClick(e) {
    const mouse = getMouse(e);
    const newPercentage = mouse.x / e.currentTarget.offsetWidth;
    const songLength = this.audioEl.duration;
    this.audioEl.currentTime = songLength * newPercentage;
    this.updateTime();
  }

  updateTime(e) {
    const decimalPercentage = this.audioEl.currentTime / this.audioEl.duration;
    const progPercentage = decimalPercentage * 100;
    this.setState({
      curTrackTime: this.audioEl.currentTime,
      progPercentage
    });
  }

  updateVolume(e) {
    const value = e.currentTarget.value;
    this.audioEl.volume = value;
    this.setState({volumeLevel: value});
  }

  playPauseTrack() {
    this.props.togglePlayPause(!this.props.playbar.playing);
  }

  nextTrack() {
    const trackIndex = this.props.playbar.currentlyPlayingIdx;
    const playQueue = this.props.playbar.playQueue;
    if ((playQueue.length - 1) > trackIndex) {
      this.props.receiveCurTrack(playQueue[trackIndex + 1]);
    }
    this.resetTimeState.call(this);
  }

  previousTrack() {
    const trackIndex = this.props.playbar.currentlyPlayingIdx;
    const playQueue = this.props.playbar.playQueue;

    if (this.audioEl.currentTime < 3.0) {
      if (trackIndex > 0) {
        this.props.receiveCurTrack(playQueue[trackIndex - 1]);
      } else {
        this.audioEl.currentTime = 0.0;
      }
    } else {
      this.audioEl.currentTime = 0.0;
    }
    this.resetTimeState.call(this);
  }

  resetTimeState() {
    this.setState({
      curTrackTime: 0,
      progPercentage: 0
    });
  }

  muteUnmuteTrack() {
    let prevVol = 0.0;
    if (this.state.volumeLevel <= 0.0) {
      this.audioEl.volume = this.state.prevVol;
      this.setState({volumeLevel: this.state.prevVol});
    } else {
      prevVol = this.audioEl.volume;
      this.audioEl.volume = 0.0;
      this.setState({volumeLevel: 0.0, prevVol});
    }
  }

  redirectToTrackShow() {
    this.props.history.push(`/tracks/${this.props.track.id}`);
  }

  redirectToUserProfile() {
    this.props.history.push(`/users/${this.props.track.artist_id}`);
  }

  render() {
    if (!this.props.playbar.visible) {
      return null;
    } else {
      let volumeIcon = <i className="fa fa-volume-off"></i>;
      if (this.state.volumeLevel > 0.0 && this.state.volumeLevel < 0.65) {
        volumeIcon = <i className="fa fa-volume-down"></i>;
      } else if (this.state.volumeLevel >= 0.65) {
        volumeIcon = <i className="fa fa-volume-up"></i>;
      }

      const playPauseSrc = this.props.playbar.playing ? window.pause : window.play_button;
      return (
        <div className="audio-footer-wrapper">
          <div className="audio-footer-content">
            <div className="playback-controls">
              <img id="playbarPrev" onClick={this.previousTrack.bind(this)} src={window.previous_track}></img>
              <img id="playbarPlayButton" onClick={this.playPauseTrack.bind(this)} src={playPauseSrc}></img>
              <img id="playbarNext" onClick={this.nextTrack.bind(this)} src={window.skip_track}></img>
              <span className="time-string-1">{secondsToTimeString(this.state.curTrackTime)}</span>
              <div className="progress-bar"
                onClick={this.seekToClick}>
                <div className="bg-progress-bar"></div>
                <div className="color-progress-bar"
                  style={ {width: `${this.state.progPercentage}%`}}>
                </div>
                <div className="progress-ball"
                  style={ {marginLeft: `${this.state.progPercentage-1}%`}}></div>
              </div>
              <span className="time-string-2">{this.audioRef.current ?
                  secondsToTimeString(this.audioRef.current.duration || 0)
                  : "0:00"}
                </span>
              <div className="volume-controls">
                <button className="volume-button" onClick={this.muteUnmuteTrack.bind(this)}>{volumeIcon}</button>
                <div className="slider-bg">
                  <input className="volume-slider" onChange={this.updateVolume.bind(this)}
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.01"
                    value={this.state.volumeLevel}></input>
                </div>
              </div>
            </div>
            <div className="track-info">
              <img onClick={this.redirectToTrackShow.bind(this)} src={this.props.track.artwork_file}></img>
              <div className="artist-and-title">
                <span onClick={this.redirectToUserProfile.bind(this)}>{this.props.user.username}</span>
                <span onClick={this.redirectToTrackShow.bind(this)}>{this.props.track.title}</span>
              </div>
            </div>
            <audio className="audioEl"
              autoPlay
              ref={this.audioRef}
              src={this.props.track.track_file}
              onTimeUpdate={this.updateTime}
              onEnded={this.nextTrack.bind(this)}></audio>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const currentlyPlayingId = state.ui.playbar.currentlyPlayingId;
  let user = null;
  let track = null;
  if (currentlyPlayingId) {
    track = state.entities.tracks[currentlyPlayingId];
    user = state.entities.users[track.artist_id];
  }
  return {
    playbar: state.ui.playbar,
    user,
    track
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveCurTrack: (trackId) => dispatch(receiveCurTrack(trackId)),
    togglePlayPause: (bool) => dispatch(togglePlayPause(bool))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AudioFooter));
