import React from 'react';
import { connect } from 'react-redux';
import { seek } from '../../actions/playbar_actions';
import { playPauseTrack } from '../../util/helpers';


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
    const wave = this.waveRef.current;
    const ws = WaveSurfer.create({
      container: wave,
      waveColor: 'rgba(255, 255, 255, 0.9)',
      barWidth: 2,
      progressColor: '#43c3d2',
      responsive: true,
      cursorWidth: 0
    });
    ws.load(this.props.track.track_file);
    ws.setMute(true);

    ws.on('seek', (percentage) => this.props.seek(percentage));

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

      if (playbar.progPercentage !== this.state.progPercentage) {
        this.setState({progPercentage: playbar.progPercentage});
        this.state.waveform.seekTo(playbar.progPercentage);
      }

    }
  }

  loadWaveSurfer() {
    this.state.waveform.load(this.props.track.track_file);
    // const wave = this.waveRef.current;
    // const ws = WaveSurfer.create({
    //   container: wave,
    //   waveColor: 'rgba(255, 255, 255, 0.9)',
    //   barWidth: 2,
    //   progressColor: '#43c3d2',
    //   responsive: true,
    //   cursorWidth: 0
    // });
    // ws.setMute(true);
    // ws.on('seek', (percentage) => this.props.seek(percentage));

    // this.setState({waveform: ws});
  }

  handleClick() {
    // if (!this.state.waveform.playing()) {
    //   playPauseTrack.call(this);
    // }
  }

  render() {
    if (this.state.waveform) {
      this.state.playing ?
        this.state.waveform.play() :
        this.state.waveform.pause();
    }

    return (
      <div className="waveform"
        ref={this.waveRef}
        onClick={this.handleClick.bind(this)}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Waveform);
