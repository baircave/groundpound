import React from 'react';
import { connect } from 'react-redux';
import { selectComments, selectCommentAuthors } from '../../reducers/selectors';
import { trackAgeFromMs } from '../../util/helpers';

const CommentIndex = ({ comments, users }) => {
  let plural = "s";
  if (comments.length === 1) {
    plural = "";
  }

  return (
    <div className="comments">
      <h3><i className="fa fa-comment"></i>{comments.length} comment{plural}</h3>
      <ul>
        {comments.map((comment) => {
          const d3 = new Date(comment.created_at);
          const d4 = new Date();
          let commentAge = trackAgeFromMs(d4 - d3);
          return (
            <li className="comment" key={comment.id}>
              <div className="commentMeat">
                <h4 className="commentAge">{users[comment.id].username}</h4>
                <p className="commentBody">{comment.body}</p>
              </div>
              <h4 className="commentAge">{commentAge}</h4>
            </li>
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
