import React from 'react';
import { connect } from 'react-redux';
import { postComment, clearErrors } from '../../actions/comment_actions';
import { openModal } from '../../actions/modal_actions';
import { generateRGB, imageLoaded } from '../../util/helpers';
import { withRouter } from 'react-router-dom';

class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: "",
      parent_comment_id: props.parent_comment_id,
      track_id: props.trackId,
      commentErrors: [],
      opacityClass: ""
    };
    this.gradientString = `linear-gradient(45deg, #43c3d3, ${generateRGB()})`;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.commentErrors.length > 0 &&
      prevProps.commentErrors[0] !== this.props.commentErrors[0]
    ) {
      this.setState({commentErrors: this.props.commentErrors});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.body !== "") {
      this.props.postComment(this.props.trackId, this.state);
      this.setState({body: ""});
    }
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  ensureSession() {
    if (!this.props.loggedIn) {
      this.props.openModal("login");
    }
  }

  render() {
    const profImgClassNames = `opacity-fade comment-form-prof-photo ${this.state.opacityClass}`;

    return (
      <div className="comment-form-wrapper">
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <div className="comment-prof-gradient"
            onClick={() => {if (this.props.loggedIn) this.props.history.push(`/users/${this.props.loggedIn}`)}}
            style={ {background: this.gradientString}}>
            { this.props.loggedIn ?
              <img className={profImgClassNames}
                onLoad={imageLoaded.bind(this)}
                src={this.props.profPhoto}></img> :
              null
            }
          </div>
          <input onFocus={this.ensureSession.bind(this)}
            onChange={this.updateField("body")}
            className="comment-field"
            type="text"
            placeholder="Write a comment"
            value={this.state.body}></input>
          <span className="comment-errors">{this.state.commentErrors[0]}</span>
        </form>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  let profPhoto = null;
  if (state.session.id) profPhoto = state.entities.users[state.session.id].profile_photo;
  return {
    loggedIn: state.session.id,
    commentErrors: state.errors.comments,
    profPhoto
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postComment: (trackId, comment) => dispatch(postComment(trackId, comment)),
    openModal: (modal) => dispatch(openModal(modal)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
