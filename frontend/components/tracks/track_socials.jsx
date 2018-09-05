import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { makeLike, deleteLike } from '../../actions/like_actions';
import { makeRepost, deleteRepost } from '../../actions/repost_actions';
import { withRouter } from 'react-router-dom';
import { numberWithCommas } from '../../util/helpers';
import { deleteTrack } from '../../actions/track_actions';

const classMap = {
  true: "social-button social-button-selected",
  false: "social-button"
};

class TrackSocials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      reposted: false,
      disableDelete: false
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  loggedIn() {
    return Object.keys(this.props.currUser).length !== 0;
  }

  componentDidMount() {
    if (this.loggedIn()) {
      this.colorizeSocials();
    }
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  colorizeSocials() {
    const trackId = this.props.track.id;

    const likedIds = this.props.currUser.liked_ids;
    const repostedIds = this.props.currUser.reposted_ids;

    const isLiked = likedIds.includes(trackId);
    const currUser = this.props.currUser;

    if (isLiked !== this.state.liked) {
      this.setState({liked: isLiked});
    }

    const isReposted = repostedIds.includes(trackId);
    if (isReposted !== this.state.reposted) {
      this.setState({reposted: isReposted});
    }
  }

  toggleSocial(social) {
    if (!this.loggedIn()) {
      this.props.openModal("login");
      return;
    }

    const trackId = this.props.track.id;
    switch (social) {
      case "like":
        if (this.state.liked) {
          this.props.deleteLike(trackId);
        } else {
          this.props.makeLike(trackId);
        }
        break;
      case "repost":
        if (this.state.reposted) {
          this.props.deleteRepost(trackId);
        } else {
          this.props.makeRepost(trackId);
        }
        break;
    }
  }

  redirectToTrackShow() {
    this.props.history.push(`/tracks/${this.props.track.id}`);
  }

  handleDelete() {
    this.setState({disableDelete: true});
    const userId = this.props.currUser.id;
    this.props.deleteTrack(this.props.track.id).then(() => {
      this.props.history.push(`/users/${userId}`);
    });
  }

  render() {
    if (!this.props.track.id) return null;

    let deleteButton = null;
    if (this.props.currUser.id === this.props.track.artist_id && this.props.showDelete) {
      deleteButton = (
        <div
          onClick={this.handleDelete}
          className="social-button"
          disabled={this.state.disableDelete}>
          <i className="fa fa-trash" aria-hidden="true"></i> Delete track
        </div>
      );
    }

    return (
      <div className="flex space-between">
        <div className="flex">
          <div className={classMap[this.state.liked]}
            onClick={this.toggleSocial.bind(this, "like")}>
            <i className="fas fa-heart"></i> {this.props.track.like_count}
          </div>
          { this.props.currUser.id != this.props.track.artist_id ?
            <div className={classMap[this.state.reposted]}
              onClick={this.toggleSocial.bind(this, "repost")}>
              <i className="fas fa-retweet"></i> {this.props.track.repost_count}
            </div> :
            null
          }
          {deleteButton}
        </div>
        <div className="track-index-counts">
          <h5>
            <i className="fa fa-play index-play" aria-hidden="true"></i>
            {numberWithCommas(this.props.track.plays)}
          </h5>
          <h5 className="comment-count"
            onClick={this.redirectToTrackShow.bind(this)}>
            <i className="fa fa-comment comment-play"></i>
            {this.props.track.comment_count}
          </h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currUser = state.entities.users[state.session.id] || {};
  return {
    currUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeRepost: (trackId) => dispatch(makeRepost(trackId)),
    deleteRepost: (trackId) => dispatch(deleteRepost(trackId)),
    makeLike: (trackId) => dispatch(makeLike(trackId)),
    deleteLike: (trackId) => dispatch(deleteLike(trackId)),
    openModal: (modal) => dispatch(openModal(modal)),
    deleteTrack: (trackId) => dispatch(deleteTrack(trackId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackSocials));
