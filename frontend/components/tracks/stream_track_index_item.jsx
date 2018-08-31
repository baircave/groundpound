import React from 'react';
import { connect } from 'react-redux';
import { incrementPlays } from '../../actions/track_actions';
import { receiveCurTrack, togglePlayPause } from '../../actions/playbar_actions';
import { withRouter } from 'react-router-dom';
import { playPauseTrack, generateRGB, imageLoaded, trackAgeFromMs, numberWithCommas } from '../../util/helpers';
import Waveform from './waveform';

const classMap = {
  true: "social-button-selected",
  false: "social-button"
};

class StreamTrackIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.playPauseTrack = playPauseTrack.bind(this);
    this.redirectToTrackShow = this.redirectToTrackShow.bind(this);
    this.redirectToUserProfile = this.redirectToUserProfile.bind(this);
    this.randomGradient = `linear-gradient(45deg, #43c3d3, ${generateRGB()})`;
    this.state = {
      opacityClass: "",
      pbId: "",
      liked: false,
      reposted: false
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

    const prevLikedIds = prevProps.currUser.likedIds;
    const prevRepostedIds= prevProps.currUser.repostedIds;
    const likedIds = this.props.currUser.likedIds;
    const repostedIds = this.props.currUser.repostedIds;

    if (prevLikedIds !== likedIds || prevRepostedIds !== repostedIds) {
      this.setState({
        liked: likedIds.includes(trackId),
        reposted: repostedIds.includes(trackId)
      });
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

  toggleSocial(social) {
    switch (social) {
      case "like":
        //dispatch action to toggle like
        //set that state locally
      case "repost":
        //dispatch action to toggle repost
        //set that state locally
      default:

    }
  }


  render() {
    if (!this.props.user || !this.props.track) return null;

    let playPauseIcon = <img src={window.play_button}></img>;

    if (this.props.playbar.playing &&
      this.props.track.id === parseInt(this.props.playbar.currentlyPlayingId)) {
      if (this.props.playbar.audioHTMLPlaying) {
        playPauseIcon = <img src={window.pause}></img>;
      } else {
        playPauseIcon = <img id={this.state.pbId} src={window.track_loading} onLoad={() => this.setState({pbId: "track-loading-gif"})}></img>;
      }
    }

    const d1 = new Date(this.props.track.created_at);
    const d2 = new Date();
    let trackAge = "";
    if (d2 - d1) {
      trackAge = trackAgeFromMs(d2 - d1) || "";
    }

    const artClassnames = `stream-track-artwork opacity-fade ${this.state.opacityClass}`

    return (
      <li className="stream-track-index-item">
        <div className="flex">
          <div className="index-art-gradient"
            style={ {background: this.randomGradient}}>
            <img onClick={this.redirectToTrackShow}
              className={artClassnames}
              onLoad={imageLoaded.bind(this)}
              src={this.props.track.artwork_file}></img>
          </div>
          <div className="flex-column fill-width">
            <div className="flex stream-track-item-info">
              <div className="flex">
                <div className="play-button stream-play-button"
                  onClick={this.playPauseTrack}>
                  {playPauseIcon}
                </div>
                <div className="throw-button">
                  <h4 onClick={this.redirectToTrackShow}>{this.props.track.title}</h4>
                  <h4 onClick={this.redirectToUserProfile}>{this.props.user.username}</h4>
                </div>
              </div>
              <div className="flex-column space-between track-index-info">
                <h4 className="track-age">{trackAge}</h4>
              </div>
            </div>

            <Waveform
              track={this.props.track}
              color="#8c8c8c"
              height={75}
              waveformClassNames="hover-pointer stream-waveform"></Waveform>

            <div className="flex space-between">
              <div className="flex">
                <div className={classMap[this.state.liked]}
                  onClick={this.toggleSocial.bind(this, "like")}>
                  <i className="fas fa-heart"></i> {this.props.track.like_count}
                </div>
                <div className={classMap[this.state.reposted]}
                  onClick={this.toggleSocial.bind(this, "repost")}>
                  <i className="fas fa-retweet"></i> {this.props.track.repost_count}
                </div>
              </div>
              <div className="track-index-counts">
                <h5>
                  <i className="fa fa-play index-play" aria-hidden="true"></i>
                  {numberWithCommas(this.props.track.plays)}
                </h5>
                <h5 className="comment-count"
                  onClick={this.redirectToTrackShow}>
                  <i className="fa fa-comment comment-play"></i>
                  {this.props.track.comment_count}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}


const mapStateToProps = (state) => {
  const currUser = state.entities.users[state.session.id];
  return {
    playbar: state.ui.playbar,
    currUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementPlays: (trackId) => dispatch(incrementPlays(trackId)),
    receiveCurTrack: (trackId) => dispatch(receiveCurTrack(trackId)),
    togglePlayPause: (bool) => dispatch(togglePlayPause(bool))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StreamTrackIndexItem));
