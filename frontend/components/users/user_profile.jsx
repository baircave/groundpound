import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../actions/user_actions';
import { generateRGB, imageLoaded } from '../../util/helpers';
import TrackIndex from '../tracks/track_index';
import StreamTrackIndexItem from '../tracks/stream_track_index_item';
import ProfileSidebar from './profile_sidebar';
import { openModal } from '../../actions/modal_actions';
import Modal from '../modal';

class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      coverPhotoUrl: "",
      profilePhotoUrl: "",
      coverPhotoFile: "",
      profilePhotoFile: "",
      profOpacityClass: "",
      coverOpacityClass: "",
      showProfButton: "none",
      showCoverButton: "none"
    };
    const randRGB = generateRGB();
    this.randomCoverGradient = `linear-gradient(45deg, ${randRGB}, #43c3d3)`;
    this.randomProfileGradient = `linear-gradient(45deg, #43c3d3, ${randRGB})`;
    this.coverPhotoInput = React.createRef();
    this.profilePhotoInput = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const prevPPFile = prevProps.user.profile_photo;
    const currPPFile = this.props.user.profile_photo;
    const prevCPFile = prevProps.user.cover_photo_file;
    const currCPFile = this.props.user.cover_photo_file;
    if (prevPPFile !== currPPFile ||
      prevCPFile !== currCPFile ||
      currCPFile !== this.state.coverPhotoUrl ||
      currPPFile !== this.state.profilePhotoUrl
    ) {
      this.setState({
        coverPhotoUrl: currCPFile,
        profilePhotoUrl: currPPFile
      });
    }

    if (prevProps.match.params.id != this.props.match.params.id) {
      this.setState({profOpacityClass: "", coverOpacityClass: ""});
      this.props.fetchUser(this.props.match.params.id);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({profOpacityClass: "", coverOpacityClass: ""});
    this.props.fetchUser(this.props.match.params.id);
  }

  profImageLoaded() {
    this.setState({profOpacityClass: "opacity-on"});
  }

  coverImageLoaded() {
    this.setState({coverOpacityClass: "opacity-on"});
  }

  handleCoverPhotoFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append('user[cover_photo]', file);
    reader.onloadend = () => {
      this.setState({ coverPhotoUrl: reader.result, coverPhotoFile: file });
      this.props.updateUser(this.props.user.id, formData);
    };
  }

  handleProfilePhotoFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append('user[profile_photo]', file);
    reader.onloadend = () => {
      this.setState({ profilePhotoUrl: reader.result, profilePhotoFile: file });
      this.props.updateUser(this.props.user.id, formData);
    };
  }

  editButton() {
    if (this.props.loggedIn && this.props.match.params.id == this.props.loggedIn) {
      return (
        <button className="trans-button edit-button"
          onClick={() => this.props.openModal("userProfileForm")}>
          <i className="fa fa-pencil" aria-hidden="true"></i> Edit
        </button>
      );
    } else return null;
  }

  chooseCoverPhoto() {
    if (this.props.loggedIn && this.props.match.params.id == this.props.loggedIn) {
      return (
        <div>
          <div className="ref-button cover-photo-input-button"
            style={ {display: this.state.showCoverButton}}
            onClick={(e) => this.coverPhotoInput.current.click()}>
            <i className="fa fa-camera"></i> Update image</div>
          <input ref={this.coverPhotoInput}
            accept="image/*"
            className="cover-photo-input"
            type="file"
            onChange={this.handleCoverPhotoFile.bind(this)}></input>
        </div>
      );
    } else return null;
  }

  chooseProfilePhoto() {
    if (this.props.loggedIn && this.props.match.params.id == this.props.loggedIn) {
      return (
        <div>
          <div className="ref-button profile-photo-input-button"
            style={ {display: this.state.showProfButton}}
            onClick={(e) => this.profilePhotoInput.current.click()}>
            <i className="fa fa-camera"></i> Update image</div>
          <input ref={this.profilePhotoInput}
            accept="image/*"
            className="profile-photo-input"
            type="file"
            onChange={this.handleProfilePhotoFile.bind(this)}></input>
        </div>
      );
    } else return null;
  }

  render() {
    let editButton = this.editButton();
    let chooseCoverPhoto = this.chooseCoverPhoto();
    let chooseProfilePhoto = this.chooseProfilePhoto();

    const profImgClassNames = `profile-photo opacity-fade ${this.state.profOpacityClass}`;
    const coverImgClassNames = `cover-photo opacity-fade ${this.state.coverOpacityClass}`;

    return (
      <div className="profile-page">
        <Modal user={this.props.user}/>
        <div className="profile-page-sub-wrapper"
          onMouseEnter={() => this.setState({showCoverButton: "block", showProfButton: "none"})}
          onMouseLeave={() => this.setState({showCoverButton: "none"})}>
          {chooseCoverPhoto}
          <div className="gradient-cover"
            style={ { background: this.randomCoverGradient}}>
            <img className={coverImgClassNames}
              src={this.state.coverPhotoUrl}
              onLoad={this.coverImageLoaded.bind(this)}></img>
          </div>
          <div className="basic-user-info">
            <div className="profile-photo-wrapper"
              onMouseEnter={() => this.setState({showProfButton: "block"})}
              onMouseLeave={() => this.setState({showProfButton: "none"})}
              style={ { background: this.randomProfileGradient}}>
              <img className={profImgClassNames}
                src={this.state.profilePhotoUrl}
                onLoad={this.profImageLoaded.bind(this)}></img>
              {chooseProfilePhoto}
            </div>
            <div className="name-and-location">
              <h3>{this.props.user.nickname}</h3>
              { this.props.user.location ? <h3>{this.props.user.location}</h3> : null }
            </div>
          </div>
        </div>
        <div className="max-min-width">
          <div className="label-select-with-buttons">
            <div>
              <h2 className="index-label">Tracks</h2>
            </div>
            <div className="show-pages-button-wrapper">
              {editButton}
            </div>
          </div>
        </div>
        <div className="index-and-sidebar">
          <TrackIndex userProf={true}
            listType="stream-list"
            trackIds={this.props.user.track_ids}
            indexItemComponent={StreamTrackIndexItem}/>
          <ProfileSidebar></ProfileSidebar>
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
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (userId, user) => dispatch(updateUser(userId, user)),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
