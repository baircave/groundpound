import { RECEIVE_COMMENT_ERRORS, CLEAR_ERRORS, RECEIVE_COMMENT } from '../actions/comment_actions';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case RECEIVE_COMMENT:
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};
