import React from 'react';
import { connect } from 'react-redux';
import { generateRGB, imageLoaded } from '../../util/helpers';
import { withRouter } from 'react-router-dom';


class SidebarUserIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToUserProfile = this.redirectToUserProfile.bind(this);
    this.randomGradient = `linear-gradient(45deg, #43c3d3, ${generateRGB()})`;
    this.state = {
      opacityClass: "",
    };
  }

  redirectToUserProfile() {
    this.props.history.push(`/users/${this.props.user.id}`);
  }

  render() {
    const artClassnames = `sidebar-profile opacity-fade ${this.state.opacityClass}`

    return (
      <li className="sidebar-track-index-item flex">
        <div className="sidebar-profile-photo">
          <div className="sidebar-profile-gradient"
            style={ {background: this.randomGradient}}>
            <img onClick={this.redirectToUserProfile}
              className={artClassnames}
              onLoad={imageLoaded.bind(this)}
              src={this.props.user.profile_photo}></img>
          </div>
        </div>
        <div className="sidebar-track-details">
          <h5 onClick={this.redirectToUserProfile}>{this.props.user.username}</h5>
          <div className="sidebar-index-counts">
            <h5 onClick={this.redirectToUserProfile}>
              <i className="fas fa-users"></i>
              {this.props.user.follower_count}
            </h5>
          </div>
        </div>
      </li>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.userId];
  return {
    user
  }
}

export default withRouter(connect(mapStateToProps)(SidebarUserIndexItem));
