import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge} from 'lodash';

const defaultState = {
  id: null,
  profPhotoUrl: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: action.user.id, profPhotoUrl: action.user.profile_photo };
    case LOGOUT_CURRENT_USER:
      return defaultState;
    default:
      return state;
  }
};
