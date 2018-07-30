import sessionErrorsReducer from './session_errors_reducer';
import commentErrorsReducer from './comment_errors_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  session: sessionErrorsReducer,
  comments: commentErrorsReducer
});
