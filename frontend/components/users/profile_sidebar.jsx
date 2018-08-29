import React from 'react';
import { connect } from 'react-redux';
import SidebarTrackIndex from '../tracks/sidebar_track_index';
import SidebarUserIndex from './sidebar_user_index';

class ProfileSidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let followerCount = "";
    let followingCount = "";
    let trackCount = "";
    const user = this.props.user;

    if (user.track_ids) {
      followerCount = user.follower_count;
      followingCount = user.following_count;
      trackCount = user.track_ids.length - user.reposted_ids.length;
    }

    return (
      <div className="sidebar">
        <div className="flex dark-gray sidebar-header">
          <div>
            <span>Followers</span>
            <h3>{followerCount}</h3>
          </div>
          <div className="sidebar-header-item">
            <span>Following</span>
            <h3>{followingCount}</h3>
          </div>
          <div className="sidebar-header-item">
            <span>Tracks</span>
            <h3>{trackCount}</h3>
          </div>
        </div>
        <span className="bio">{user.bio}</span>
        <SidebarTrackIndex trackIds={user.liked_ids} likeCount={user.like_count}/>
        <SidebarUserIndex userIds={user.followed_ids} followingCount={user.following_count}/>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  let user = {};
  if (state.session.id) user = state.entities.users[state.session.id];
  return {
    user
  }
}

export default connect(mapStateToProps)(ProfileSidebar);
