import React from 'react';
import NavBar from '../main_page/navbar';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { postTrack } from '../../actions/track_actions';


class UploadTrack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      track_url: "",
      imageUrl: null,
      imageFile: null,
      trackFile: null
    };
    this.handleArtFile = this.handleArtFile.bind(this);
    this.handleTrackFile = this.handleTrackFile.bind(this);
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  handleArtFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => this.setState({ imageUrl: reader.result, imageFile: file});
  }

  handleTrackFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => this.setState({trackFile: file});
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('track[title]', this.state.title);
    formData.append('track[track_url]', this.state.track_url);
    formData.append('track[description]', this.state.description);
    formData.append('track[artwork]', this.state.imageFile);
    formData.append('track[track_file]', this.state.trackFile);
    this.props.postTrack(formData);
  }


  render() {
    let url = window.sc_default_artwork;
    if (this.state.imageUrl) {
      url = this.state.imageUrl;
    }
    const preview = <img src={url}></img>;
    return (
      <div>
        <NavBar></NavBar>
        <div className="form_wrapper">
          <h1 className="form_header">Upload to Groundpound</h1>
          <form className="upload_form">
            <input
              accept="audio/*"
              className="track_file_input"
              type="file"
              onChange={this.handleTrackFile}></input>
            {preview}
            <div className="form_fields">
              <label>Title</label>
              <input type="text"
                onChange={this.updateField("title")}
                placeholder="Name your track"></input>
              <div className="url_field">
                <p>groundpound.herokuapp.com/{this.props.user.username}/</p>
                <input onChange={this.updateField("track_url")}
                    placeholder="your-custom-url"
                    type="text"></input>
              </div>

              <label>Description</label>
              <textarea placeholder="Describe your track"
                onChange={this.updateField("description")}></textarea>

              <input type="file"
                className="artwork_file_input"
                accept="image/*"
                onChange={this.handleArtFile}></input>
              <div className="form_buttons">
                <NavLink className="cancel" to="/">Cancel</NavLink>
                <button onClick={this.handleSubmit}
                  className="colorButton, trackSubmitButton"
                  disabled={!Boolean(this.state.title && this.state.trackFile)}>Save
                  <span className="tool_tip_text">Choose a title and audio file</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTrack: (trackInfo) => dispatch(postTrack(trackInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadTrack);
