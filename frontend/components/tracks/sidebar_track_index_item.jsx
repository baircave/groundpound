import React from 'react';
import { connect } from 'react-redux';
import { receiveCurTrack, togglePlayPause, setQueue } from '../../actions/playbar_actions';
import { incrementPlays } from '../../actions/track_actions';
import { withRouter } from 'react-router-dom';
import { playPauseTrack, generateRGB, imageLoaded, numberWithCommas } from '../../util/helpers';

class SidebarTrackIndexItem extends React.Component {
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
    const trackId = this.props.track.id;
    const previouslyPlayingId = prevProps.playbar.currentlyPlayingId;
    const currentlyPlayingId = this.props.playbar.currentlyPlayingId;
    if (previouslyPlayingId !== currentlyPlayingId) {
      if (currentlyPlayingId && currentlyPlayingId != trackId) {
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
    if (Object.keys(this.props.track).length === 0 || !this.props.user) return null;

    let playPauseIcon = <img src={window.play_button}></img>;
    let showPlayButton = this.state.showPlayButton;

    if (this.props.playbar.playing &&
      this.props.track.id === parseInt(this.props.playbar.currentlyPlayingId)) {
      if (this.props.playbar.audioHTMLPlaying) {
        playPauseIcon = <img src={window.pause}></img>;
        showPlayButton = "visible";
      } else {
        playPauseIcon = <img id={this.state.pbId} src={window.track_loading} onLoad={() => this.setState({pbId: "track-loading-gif"})}></img>;
      }
    }

    const artClassnames = `sidebar-artwork opacity-fade ${this.state.opacityClass}`

    showPlayButton = this.state.mouseOver ? "visible" : showPlayButton;
    return (
      <li className="sidebar-track-index-item flex">
        <div className="sidebar-artwork">
          <div className="sidebar-artwork-gradient"
            style={ {background: this.randomGradient}}>
            <img onClick={this.redirectToTrackShow}
              className={artClassnames}
              onLoad={imageLoaded.bind(this)}
              src={this.props.track.artwork_file}></img>
          </div>
          <div className="sidebar-artwork-mouseover"
            onClick={this.redirectToTrackShow}
            onMouseOver={this.showPlayButton.bind(this, "enter")}
            onMouseLeave={this.showPlayButton.bind(this, "exit")}>
            <div className="sidebar-play-button hover-play-button"
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
        <div className="sidebar-track-details">
          <h5 onClick={this.redirectToUserProfile}>{this.props.user.username}</h5>
          <h5 onClick={this.redirectToTrackShow}>{this.props.track.title}</h5>
          <div className="sidebar-index-counts">
            <h5>
              <i className="fa fa-play index-play" aria-hidden="true"></i>
              {numberWithCommas(this.props.track.plays)}
            </h5>
            <h5><i className="fas fa-heart"></i>{this.props.track.like_count}</h5>
            <h5><i className="fas fa-retweet"></i>{this.props.track.repost_count}</h5>
          </div>
        </div>
      </li>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.trackId];
  // const user = state.entities.users[track.artist_id];
  return {
    playbar: state.ui.playbar,
    track: track ? track : {},
    user: track ? state.entities.users[track.artist_id] : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveCurTrack: (trackId) => dispatch(receiveCurTrack(trackId)),
    togglePlayPause: (bool) => dispatch(togglePlayPause(bool)),
    incrementPlays: (trackId) => dispatch(incrementPlays(trackId)),
    setQueue: (trackIds) => dispatch(setQueue(trackIds))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarTrackIndexItem));
