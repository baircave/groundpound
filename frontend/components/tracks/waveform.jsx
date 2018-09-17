import React from 'react';
import { connect } from 'react-redux';
import { seek } from '../../actions/playbar_actions';
import { playPauseTrack } from '../../util/helpers';
import { withRouter } from 'react-router-dom';

class Waveform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waveform: null,
      playing: false,
      progPercentage: 0.0
    };
    this.loadWaveSurfer = this.loadWaveSurfer.bind(this);
    this.waveRef = React.createRef();
  }

  componentDidMount() {
    let wavecolor = 'rgba(255, 255, 255, 0.9)';
    if (this.props.color) wavecolor = this.props.color;
    let height = 128;
    if (this.props.height) height = this.props.height;

    const wave = this.waveRef.current;
    const ws = WaveSurfer.create({
      container: wave,
      waveColor: wavecolor,
      barWidth: 2,
      progressColor: '#43c3d2',
      responsive: true,
      cursorWidth: 0,
      height
    });

    const trackFile = this.props.track.track_file;
    if (trackFile) ws.load(trackFile, JSON.parse(this.props.track.waveform));

    ws.setMute(true);

    ws.on('seek', this.seek.bind(this));
    ws.on('ready', this.waveformLoaded.bind(this));
    ws.on('finish', () => {
      setTimeout(() => ws.stop(), 50);
      this.setState({playing: false});
    });

    this.setState({waveform: ws});
  }

  componentDidUpdate(prevProps) {
    if (this.props.track.track_file != prevProps.track.track_file) {
      this.loadWaveSurfer();
    }

    const playbar = this.props.playbar;

    if (this.props.track.id == playbar.currentlyPlayingId) {
      if (playbar.audioHTMLPlaying !== this.state.playing) {
        this.setState({playing: playbar.audioHTMLPlaying});
      }

      const waveform = this.state.waveform;
      const wsPercentage = waveform.getCurrentTime() / waveform.getDuration();

      if (Math.abs(wsPercentage - this.props.playbar.currTime) > 0.0001) {
        waveform.seekTo(this.props.playbar.currTime);
      }

    } else {
      if (this.state.playing) {
        this.setState({playing: false});
      }
    }
  }

  loadWaveSurfer() {
    const track = this.props.track;
    if (track.track_file) {
      const waveform = JSON.parse(track.waveform);
      this.state.waveform.load(track.track_file);
    }
  }

  waveformLoaded() {
    const playbar = this.props.playbar;

    if (this.props.track.id == playbar.currentlyPlayingId) {
      if (playbar.audioHTMLPlaying !== this.state.waveform.isPlaying()) {
        this.setState({playing: playbar.audioHTMLPlaying});
      }

      this.state.waveform.seekTo(playbar.currTime);
    }
    
    this.setState({ready: true});
  }

  seek(percentage) {
    if (this.props.playbar.currentlyPlayingId == this.props.track.id) {
      const seekDiff = Math.abs(this.props.playbar.currTime - percentage);
      if (seekDiff > 0.0001) {
        this.props.seek(percentage);
        this.setState({progPercentage: percentage});
      }
    }
  }

  render() {
    if (this.state.waveform) {
      if (this.state.playing && !this.state.waveform.isPlaying()) {
        this.state.waveform.play();
      } else if (!this.state.playing && this.state.waveform.isPlaying()) {
        this.state.waveform.pause();
      }
    }

    return (
      <div className={this.props.waveformClassNames}
        ref={this.waveRef}>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playbar: state.ui.playbar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    seek: (percentage) => dispatch(seek(percentage)),
    playPauseTrack: () => dispatch(playPauseTrack())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Waveform));
