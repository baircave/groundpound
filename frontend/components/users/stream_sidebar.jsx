import React from 'react';
import { connect } from 'react-redux';
import SidebarTrackIndex from '../tracks/sidebar_track_index';
import SidebarUserIndex from './sidebar_user_index';
import { fetchUser } from '../../actions/user_actions';

class StreamSidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.user.id);
  }

  render() {
    const user = this.props.user;
    if (!user.liked_ids || !user.followed_ids) return null;

    return (
      <div className="sidebar">
        <SidebarTrackIndex trackIds={user.liked_ids} likeCount={user.liked_ids.length}/>
        <SidebarUserIndex userIds={user.followed_ids} followingCount={user.followed_ids.length}/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamSidebar);
