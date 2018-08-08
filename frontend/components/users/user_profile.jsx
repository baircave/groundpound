import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import { generateRGB } from '../../util/helpers';
import TrackIndex from '../tracks/track_index';
import StreamTrackIndexItem from '../tracks/stream_track_index_item';


class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      coverPhotoUrl: null,
      coverPhotoFile: null,
      profilePhotoUrl: null,
      profilePhotoFile: null
    };
    const randRGB = generateRGB();
    this.randomCoverGradient = `linear-gradient(45deg, ${randRGB}, #43c3d3)`;
    this.randomProfileGradient = `linear-gradient(45deg, #43c3d3, ${randRGB})`;
    this.coverPhotoInput = React.createRef();
    this.profilePhotoInput = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const prevPPFile = prevProps.user.profile_photo_file;
    const currPPFile = this.props.user.profile_photo_file;
    const prevCPFile = prevProps.user.cover_photo_file;
    const currCPFile = this.props.user.cover_photo_file;
    if (prevPPFile !== currPPFile || prevCPFile !== currPPFile) {
      this.setState({
        coverPhotoUrl: currCPFile,
        profilePhotoUrl: currPPFile
      });
    }

    if (prevProps.match.params.id != this.props.match.params.id) {
      this.props.fetchUser(this.props.match.params.id);
    }
  }

  componentDidMount() {
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
    let coverPhoto = <div className="gradient-cover"
      style={ { background: this.randomCoverGradient}}></div>;

    let profilePhoto = <div className="profile-photo"
      style={ { background: this.randomProfileGradient}}></div>;

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
              <h3>{this.props.user.location}</h3>
            </div>
          </div>
        </div>
        <div className="index-and-sidebar">
          <TrackIndex userProf={true}
            listType="stream-list"
            trackIds={this.props.user.track_ids}
            indexItemComponent={StreamTrackIndexItem}/>
          <div className="sidebar">
            <span className="bio">{this.props.user.bio}</span>
          </div>
        </div>
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
