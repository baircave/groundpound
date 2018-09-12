import React from 'react';
import SidebarTrackIndex from '../tracks/sidebar_track_index';
import SidebarUserIndex from './sidebar_user_index';

export default class ProfileSidebar extends React.Component {

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
      followingCount = user.followed_ids.length;
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
        {
          user.liked_ids ?
          <SidebarTrackIndex trackIds={user.liked_ids} likeCount={user.liked_ids.length} userId={user.id}/> :
          null
        }
        {
          user.followed_ids ?
          <SidebarUserIndex userIds={user.followed_ids} followingCount={user.followed_ids.length}/> :
          null
        }
      </div>
    );
  }

}
