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
      {(comments.length > 0) ?
        <ul>
          {comments.map((comment) => {
            return (
              <CommentIndexItem comment={comment}
                trackId={trackId}
                users={users}
                key={comment.id}></CommentIndexItem>
            );
          })}
        </ul> :
        <div className="flex-column empty-index">
          <img clasName="no-comments-img" src={window.no_comments}></img>
          <h2>Seems a little quiet over here</h2>
          <h2>Be the first to comment on this track</h2>
        </div>

      }
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
