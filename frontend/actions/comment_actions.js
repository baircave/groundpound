import * as CommentApiUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment
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

export const postComment = (trackId, comment) => {
  return (dispatch) => {
    return CommentApiUtil.postComment(trackId, comment).then(
      (payload) => dispatch(receiveComment(payload)),
      (errors) => dispatch(receiveErrors(errors))
    );
  };
};

export const getComments = (trackId) => {
  return (dispatch) => {
    return CommentApiUtil.getComments(trackId).then(
      (payload) => dispatch(receiveComments(payload)),
      (errors) => dispatch(receiveErrors(errors))
    );
  };
};
