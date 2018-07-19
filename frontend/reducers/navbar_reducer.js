import { SHOW_NAVBAR, REMOVE_NAVBAR } from '../actions/navbar_actions';

export default (state = true, action) => {
  switch (action.type) {
    case SHOW_NAVBAR:
      return true;
    case REMOVE_NAVBAR:
      return false;
    default:
      return state;
  }
};
