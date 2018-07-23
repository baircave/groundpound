import React from 'react';
import { connect } from 'react-redux';
import { selectComments, selectCommentAuthors } from '../../reducers/selectors';
import CommentIndexItem from './comment_index_item';

const CommentIndex = ({ comments, users, trackId }) => {
  let plural = "s";
  if (comments.length === 1) {
    plural = "";
  }

  return (
    <div className="comments">
      <h3><i className="fa fa-comment"></i>{comments.length} comment{plural}</h3>
      <ul>
        {comments.map((comment) => {
          return (
            <CommentIndexItem comment={comment}
              trackId={trackId}
              users={users}
              key={comment.id}></CommentIndexItem>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const comments = selectComments(state, ownProps.commentIds || []);
  const users = selectCommentAuthors(state, comments);
  return {
    comments,
    users
  };
};

export default connect(mapStateToProps)(CommentIndex);
