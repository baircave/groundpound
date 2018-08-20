import React from 'react';
import { connect } from 'react-redux';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import { incrementPlays } from '../../actions/track_actions';
import { withRouter } from 'react-router-dom';
import { playPauseTrack, generateRGB, imageLoaded } from '../../util/helpers';

class TrackIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.playPauseTrack = playPauseTrack.bind(this);
    this.redirectToTrackShow = this.redirectToTrackShow.bind(this);
    this.redirectToUserProfile = this.redirectToUserProfile.bind(this);
    this.randomGradient = `linear-gradient(45deg, #43c3d3, ${generateRGB()})`;
    this.state = {
      showPlayButton: "hidden",
      mouseOver: false,
      opacityClass: "",
    };
  }

  componentDidUpdate(prevProps) {
    const trackId = this.props.track.id.toString();
    const previouslyPlayingId = prevProps.playbar.currentlyPlayingId;
    const currentlyPlayingId = this.props.playbar.currentlyPlayingId;
    if (previouslyPlayingId !== currentlyPlayingId) {
      if (currentlyPlayingId && currentlyPlayingId !== trackId) {
        this.setState({showPlayButton: "hidden"});
      }
    }

    if (prevProps.playbar.playing !== this.props.playbar.playing) {
      if (!this.props.playbar.playing) {
        this.setState({showPlayButton: "hidden"});
      }
    }
  }

  redirectToTrackShow() {
    this.props.history.push(`/tracks/${this.props.track.id}`);
  }

  redirectToUserProfile() {
    this.props.history.push(`/users/${this.props.track.artist_id}`);
  }

  showPlayButton(enterExit) {
    let mouseOver = true;
    if (enterExit === "exit") {
      mouseOver = false;
    }

    const track = this.props.track;
    const playbar = this.props.playbar;
    if (playbar.playing && playbar.currentlyPlayingId === track.id.toString()) {
      this.setState({showPlayButton: "visible", mouseOver});
    } else {
      if (enterExit === "exit") {
        this.setState({showPlayButton: "hidden", mouseOver});
      } else {
        this.setState({showPlayButton: "visible", mouseOver});
      }
    }
  }

  render() {
    let playPauseIcon;
    let showPlayButton = this.state.showPlayButton;
    if (this.props.playbar.playing &&
      this.props.track.id === parseInt(this.props.playbar.currentlyPlayingId)) {
      playPauseIcon = <img src={window.pause}></img>;
      showPlayButton = "visible";
    } else {
      playPauseIcon = <img src={window.play_button}></img>;
    }

    const artClassnames = `index-artwork opacity-fade ${this.state.opacityClass}`

    showPlayButton = this.state.mouseOver ? "visible" : showPlayButton;
    return (
      <li className="track-index-item">
        <div className="art-thumbnail">
          <div className="index-art-gradient"
            style={ {background: this.randomGradient}}>
            <img onClick={this.redirectToTrackShow}
              className={artClassnames}
              onLoad={imageLoaded.bind(this)}
              src={this.props.track.artwork_file}></img>
          </div>
          <div className="artwork-mouseover"
            onClick={this.redirectToTrackShow}
            onMouseOver={this.showPlayButton.bind(this, "enter")}
            onMouseLeave={this.showPlayButton.bind(this, "exit")}>
            <div className="play-button hover-play-button"
              onMouseOver={e => e.stopPropagation()}
              onMouseLeave={e => e.stopPropagation()}
              onClick={e => {
                e.stopPropagation();
                this.playPauseTrack(e);
              }}
              style={ {visibility: showPlayButton}}>
              {playPauseIcon}
            </div>
          </div>
        </div>
        <div className="throw-botton">
          <h4 onClick={this.redirectToTrackShow}>{this.props.track.title}</h4>
          <h4 onClick={this.redirectToUserProfile}>{this.props.user.username}</h4>
        </div>
      </li>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    playbar: state.ui.playbar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveCurTrack: (trackId) => dispatch(receiveCurTrack(trackId)),
    togglePlayPause: (bool) => dispatch(togglePlayPause(bool)),
    incrementPlays: (trackId) => dispatch(incrementPlays(trackId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackIndexItem));
