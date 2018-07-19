import React from 'react';
import { connect } from 'react-redux';
import { postComment } from '../../actions/comment_actions';

class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: "",
      parent_comment_id: props.parent_comment_id,
      track_id: props.trackId
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.postComment(this.props.trackId, this.state)
    console.log(`trackId: ${this.props.trackId}  comment: ${this.state.body}`);
  }

  updateField(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  render() {
    return (
      <div className="commentFormWrapper">
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input onChange={this.updateField("body")}
            className="commentField"
            type="text"
            placeholder="Write a comment"
            value={this.state.body}></input>
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    postComment: (trackId, comment) => dispatch(postComment(trackId, comment))
  };
};

export default connect(null, mapDispatchToProps)(CommentForm);
