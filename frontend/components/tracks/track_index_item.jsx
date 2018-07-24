import React from 'react';
import { connect } from 'react-redux';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import { withRouter } from 'react-router-dom';

class TrackIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.playPauseTrack = this.playPauseTrack.bind(this);
    this.redirectToTrackShow = this.redirectToTrackShow.bind(this);
    this.redirectToUserProfile = this.redirectToUserProfile.bind(this);
    this.state = {
      showPlayButton: "hidden"
    };
  }

  playPauseTrack() {
    const track = this.props.track;
    const playbar = this.props.playbar;
    if (playbar.playing) {
      if (playbar.currentlyPlayingId === track.id.toString()) {
        this.props.togglePlayPause(false);
        this.setState({showPlayButton: "hidden"});
      } else {
        this.props.togglePlayPause(true);
        this.props.receiveCurTrack(track.id.toString());
        this.setState({showPlayButton: "visible"});
      }
    } else {
      this.props.togglePlayPause(true);
      this.props.receiveCurTrack(track.id.toString());
      this.setState({showPlayButton: "visible"});
    }
  }

  redirectToTrackShow() {
    this.props.history.push(`/tracks/${this.props.track.id}`);
  }

  redirectToUserProfile() {
    this.props.history.push(`/users/${this.props.track.artist_id}`);
  }

  showPlayButton(enterExit) {
    return () => {
      const track = this.props.track;
      const playbar = this.props.playbar;
      if (playbar.playing && playbar.currentlyPlayingId === track.id.toString()) {
        this.setState({showPlayButton: "visible"});
      } else {
        if (enterExit === "exit") {
          this.setState({showPlayButton: "hidden"});
        } else {
          this.setState({showPlayButton: "visible"});
        }
      }
    }
  }

  render() {
    let playPauseIcon;
    if (this.props.playbar.playing &&
      this.props.track.id === parseInt(this.props.playbar.currentlyPlayingId)) {
      playPauseIcon = <img src={window.pause}></img>;
    } else {
      playPauseIcon = <img src={window.play_button}></img>;
    }

    return (
      <li className="track-index-item">
        <div className="art-thumbnail">
          <img onClick={this.redirectToTrackShow}
            className="index-artwork"
            src={this.props.track.artwork_file}></img>
          <div className="artwork-mouseover"
            onClick={this.redirectToTrackShow}
            onMouseOver={this.showPlayButton.bind(this)("enter")}
            onMouseLeave={this.showPlayButton.bind(this)("exit")}>
            <button className="playButton hover-play-button"
              onMouseOver={e => e.stopPropagation()}
              onMouseLeave={e => e.stopPropagation()}
              onClick={e => {
                e.stopPropagation();
                this.playPauseTrack();
              }}
              style={ {visibility: this.state.showPlayButton}}>
              {playPauseIcon}
            </button>
          </div>
        </div>
        <h4 onClick={this.redirectToTrackShow}>{this.props.track.title}</h4>
        <h4 onClick={this.redirectToUserProfile}>{this.props.user.username}</h4>
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
    togglePlayPause: (bool) => dispatch(togglePlayPause(bool))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackIndexItem));
