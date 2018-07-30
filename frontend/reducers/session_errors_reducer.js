import { RECEIVE_SESSION_ERRORS, CLEAR_ERRORS } from '../actions/session_actions';
import { OPEN_MODAL } from '../actions/modal_actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case OPEN_MODAL:
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
