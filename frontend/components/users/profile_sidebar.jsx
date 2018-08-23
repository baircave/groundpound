import React from 'react';
import { connect } from 'react-redux';

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
        <span className="bio">{this.props.user.bio}</span>
      </div>
    );
  }

}
