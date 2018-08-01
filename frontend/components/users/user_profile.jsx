import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import { generateRGB, makeGradient } from '../../util/helpers';
import TrackIndex from '../tracks/track_index';


class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      coverPhotoUrl: null,
      coverPhotoFile: null,
      profilePhotoUrl: null,
      profilePhotoFile: null
    }

    this.coverPhotoInput = React.createRef();
    this.profilePhotoInput = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    makeGradient.call(this);
    this.props.fetchUser(this.props.match.params.id);
  }

  handleCoverPhotoFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => this.setState({ coverPhotoUrl: reader.result, coverPhotoFile: file });
  }

  handleProfilePhotoFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => this.setState({ profilePhotoUrl: reader.result, profilePhotoUrl: file });
  }

  render() {
    let coverPhoto = (
      <div className="gradient-wrapper">
        <canvas className="canvas" ref={this.canvasRef} width="300" height="300"></canvas>
      </div>
    );
    let profilePhoto = <img className="profile-photo" src={window.gp_square}></img>;

    if (this.state.coverPhotoUrl) {
      coverPhoto = <img className="cover-photo" src={this.state.coverPhotoUrl}></img>;
    }

    if (this.state.profilePhotoUrl) {
      profilePhoto = <img className="profile-photo" src={this.state.profilePhotoUrl}></img>
    }

    let chooseCoverPhoto = null;
    let chooseProfilePhoto = null;
    if (this.props.loggedIn && this.props.match.params.id === this.props.loggedIn) { //string/int conversion nonsense here
      chooseCoverPhoto = (
        <input ref={this.coverPhotoInput}
          accept="image/*"
          className="cover-photo-input"
          type="file"
          onChange={this.handleCoverPhotoFile.bind(this)}></input>
      );
      chooseProfilePhoto = (
        <input ref={this.profilePhotoInput}
          accept="image/*"
          className="profile-photo-input"
          type="file"
          onChange={this.handleProfilePhotoFile.bind(this)}></input>
      );
    }

    return (
      <div className="profile-page">
        <div className="profile-page-sub-wrapper">
          {coverPhoto}
          <div className="basic-user-info">
            {profilePhoto}
            <div className="name-and-location">
              <h3>{this.props.user.nickname}</h3>
            </div>
          </div>
        </div>
        <TrackIndex trackIds={this.props.user.track_ids} />
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.id] || {};
  return {
    user,
    loggedIn: state.session.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
