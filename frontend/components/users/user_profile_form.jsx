import React from 'react';
import { updateField } from '../../util/helpers';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';

class UserProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      location: "",
      bio: "",
    };
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        bio: user.bio,
        location: user.location,
        nickname: user.nickname
      });
    }
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append('user[bio]', this.state.bio);
    formData.append('user[location]', this.state.location);
    formData.append('user[nickname]', this.state.nickname);
    this.props.updateUser(this.props.user.id, formData).then(
      () => this.props.closeModal()
    );
  }

  render() {

    return (
      <form className="user-profile-form form-fields">
        <h1>Edit your Profile</h1>
        <div>
          <label>Display name</label><span className="asterisk">*</span>
        </div>
        <input type="text" value={this.state.nickname}
          onChange={updateField.call(this, "nickname").bind(this)}></input>
        <label>Location</label>
        <input type="text" value={this.state.location}
          onChange={updateField.call(this, "location").bind(this)}></input>
        <label>Bio</label>
        <textarea onChange={updateField.call(this, "bio").bind(this)} value={this.state.bio}></textarea>
        <div className="edit-profile-form-buttons">
          <span className="cancel-button"
            onClick={this.props.closeModal}>Cancel</span>
          <button className="submit-button"
            onClick={this.handleSubmit.bind(this)}
            disabled={this.state.nickname === ""}>Save changes</button>
        </div>
      </form>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userId, user) => dispatch(updateUser(userId, user)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(null, mapDispatchToProps)(UserProfileForm);
