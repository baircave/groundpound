import React from 'react';
import { connect } from 'react-redux';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import { secondsToTimeString } from '../../util/helpers';

class AudioFooter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curTrackTime: 0,
      trackLength: 600,
      volumeLevel: 0.5,
      prevVol: 0.5,
      progPercentage: ""
    };
    this.audioRef = React.createRef();
    this.progressBarRef = React.createRef();
    this.playPauseTrack = this.playPauseTrack.bind(this);
    this.muteUnmuteTrack = this.muteUnmuteTrack.bind(this);
    this.previousTrack = this.previousTrack.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidUpdate() {
    if (!this.audioRef.current) {
      return;
    }

    const audioEl = this.audioRef.current;
    if (this.props.playing) {
      audioEl.play();
    } else {
      audioEl.pause();
    }

  }

  updateTime(e) {
    const audioEl = this.audioRef.current;
    const decimalPercentage = audioEl.currentTime / audioEl.duration;
    const progPercentage = decimalPercentage * 100;
    this.setState({
      curTrackTime: audioEl.currentTime,
      trackLength: audioEl.duration,
      progPercentage: `${progPercentage}%`
    });
  }

  updateVolume(e) {
    const value = e.currentTarget.value;
    const audioEl = this.audioRef.current;
    audioEl.volume = value;
    this.setState({volumeLevel: value});
  }

  playPauseTrack() {
    this.props.togglePlayPause();
  }

  nextTrack() {
    const trackIndex = this.props.curTrackIndex;
    const playQueue = this.props.playQueue;
    if ((playQueue.length - 1) > trackIndex) {
      this.props.receiveCurTrack(playQueue[trackIndex + 1]);
    } else {
      console.log("end of queue");
      return;
    }
  }

  previousTrack() {
    const trackIndex = this.props.curTrackIndex;
    const playQueue = this.props.playQueue;
    const audioEl = this.audioRef.current;
    if (trackIndex > 0) {
      if (audioEl.currentTime < 3.0) {
        this.props.receiveCurTrack(playQueue[trackIndex - 1]);
      }
    } else {
      if (audioEl.currentTime >= 3.0) {
        audioEl.currentTime = 0.0;
      } else {
        console.log("no prior tracks");
        return;
      }
    }
  }

  muteUnmuteTrack() {
    let prevVol = 0.0;
    const audioEl = this.audioRef.current;
    if (this.state.volumeLevel <= 0.0) {
      audioEl.volume = this.state.prevVol;
      this.setState({volumeLevel: this.state.prevVol});
    } else {
      prevVol = audioEl.volume;
      audioEl.volume = 0.0;
      this.setState({volumeLevel: 0.0, prevVol});
    }
  }

  render() {
    let volumeIcon = <i className="fa fa-volume-off"></i>;
    if (this.state.volumeLevel > 0.0 && this.state.volumeLevel < 0.65) {
      volumeIcon = <i className="fa fa-volume-down"></i>;
    } else if (this.state.volumeLevel >= 0.65) {
      volumeIcon = <i className="fa fa-volume-up"></i>;
    }
    if (!this.props.visible) {
      return null;
    } else {
      const playPauseSrc = this.props.playing ? window.pause : window.play_button;
      return (
        <div className="audioFooterWrapper">
          <div className="audioFooterContent">
            <div className="playBackControls">
              <img id="playbarPrev" onClick={this.previousTrack} src={window.previous_track}></img>
              <img id="playbarPlayButton" onClick={this.playPauseTrack} src={playPauseSrc}></img>
              <img id="playbarNext" onClick={this.nextTrack} src={window.skip_track}></img>
              <span className="timeString1">{secondsToTimeString(this.state.curTrackTime)}</span>
              <div className="progressBar">
                <div className="bgProgBar"></div>
                <div className="colorProgBar"
                  style={ {width: this.state.progPercentage}}></div>
              </div>
              <span className="timeString2">{this.audioRef.current ?
                  secondsToTimeString(this.audioRef.current.duration)
                  : null}
                </span>
              <div className="volumeControls">
                <button className="volumeButton" onClick={this.muteUnmuteTrack}>{volumeIcon}</button>
                <div className="sliderBG">
                  <input className="volumeSlider" onChange={this.updateVolume} type="range" min="0.0" max="1.0" step="0.01" value={this.state.volumeLevel}></input>
                </div>
              </div>
            </div>
            <div className="trackInfo">
              <img src={this.props.track.artwork_file}></img>
              <div className="artistAndTitle">
                <span>{this.props.user.nickname}</span>
                <span>{this.props.track.title}</span>
              </div>
            </div>
            <audio className="audioEl"
              ref={this.audioRef}
              autoPlay
              src={this.props.track.track_file}
              onTimeUpdate={this.updateTime}></audio>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const curTrackId = state.ui.playbar.curTrackId;
  let user = null;
  let track = null;
  const playQueue = state.ui.playbar.playQueue;
  if (curTrackId) {
    track = state.entities.tracks[curTrackId];
    user = state.entities.users[track.artist_id];
  }
  return {
    playQueue: state.ui.playbar.playQueue,
    visible: state.ui.playbar.visible,
    playing: state.ui.playbar.playing,
    curTrackIndex: playQueue.findIndex((el) => curTrackId === parseInt(el)),
    user,
    track
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveCurTrack: (trackId) => dispatch(receiveCurTrack(trackId)),
    togglePlayPause: () => dispatch(togglePlayPause())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioFooter);
