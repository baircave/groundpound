import React from 'react';
import { trackAgeFromMs } from '../../util/helpers';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';


const CommentIndexItem = ({ comment, trackId, users, sessionId, deleteComment }) => {
  const d3 = new Date(comment.created_at);
  const d4 = new Date();
  let commentAge = trackAgeFromMs(d4 - d3);

  let deleteButton = null;
  if (sessionId === comment.author_id) {
    deleteButton = (
      <button onClick={() => deleteComment(trackId, comment.id)}
        className="comment-delete">
      <i className="fa fa-trash" aria-hidden="true"></i></button>
    );
  }
  return (
    <li className="comment">
      <div className="comment-meat">
        <h4 className="comment-age">{users[comment.id].username}</h4>
        <p className="commentBody">{comment.body}</p>
      </div>
      <div className="comment-right">
        <h4 className="comment-age">{commentAge}</h4>
        {deleteButton}
      </div>
    </li>
  );
};


const mapStateToProps = (state) => {
  return {
    sessionId: state.session.id
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (trackId, commentId) => dispatch(deleteComment(trackId, commentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);
