import * as CommentApiUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveComment = (payload) => {
  return {
    type: RECEIVE_COMMENT,
    trackId: Object.values(payload.comments)[0].track_id,
    comment: payload.comments
  };
};

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

export const receiveErrors = (errorsArray) => {
  return {
    type: RECEIVE_COMMENT_ERRORS,
    errors: errorsArray
  };
};

export const removeComment = (trackId, commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
    trackId
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const postComment = (trackId, comment) => {
  return (dispatch) => {
    return CommentApiUtil.postComment(trackId, comment).then(
      (payload) => dispatch(receiveComment(payload)),
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const deleteComment = (trackId, commentId) => {
  return (dispatch) => {
    return CommentApiUtil.deleteComment(trackId, commentId).then(
      () => dispatch(removeComment(trackId, commentId))
    );
  };
};

// export const getComments = (trackId) => {
//   return (dispatch) => {
//     return CommentApiUtil.getComments(trackId).then(
//       (payload) => dispatch(receiveComments(payload)),
//       (errors) => dispatch(receiveErrors(errors))
//     );
//   };
// };
