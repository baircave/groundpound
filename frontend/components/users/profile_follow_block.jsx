import React from 'react';
import { withRouter } from 'react-router-dom';
import { generateRGB, imageLoaded } from '../../util/helpers';


class ProfileFollowBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profOpacityClass: "",
      profilePhotoUrl: ""
    };
    this.randomProfileGradient = `linear-gradient(45deg, #43c3d3, ${generateRGB()})`;
    this.redirectToProfile = this.redirectToProfile.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevPPFile = prevProps.user.profile_photo;
    const currPPFile = this.props.user.profile_photo;

    if (prevPPFile !== currPPFile || currPPFile !== this.state.profilePhotoUrl) {
      this.setState({
        profilePhotoUrl: currPPFile
      });
    }
  }

  profImageLoaded() {
    this.setState({profOpacityClass: "opacity-on"});
  }

  redirectToProfile() {
    this.props.history.push(`/users/${this.props.user.id}`);
  }

  render() {
    const profImgClassNames = `profile-img opacity-fade ${this.state.profOpacityClass}`;

    return (
      <div className="profile-follow-block">
        <div className="profile-block-photo"
          style={ { background: this.randomProfileGradient}}>
          <img className={profImgClassNames}
            onClick={this.redirectToProfile}
            src={this.state.profilePhotoUrl}
            onLoad={this.profImageLoaded.bind(this)}></img>
        </div>
        <h4 className="profile-block-nickname"
          onClick={this.redirectToProfile}>
          {this.props.user.nickname}
        </h4>
      </div>
    );
  }
}

export default withRouter(ProfileFollowBlock);
