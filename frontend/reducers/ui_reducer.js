import { combineReducers } from 'redux';
import playbarReducer from './playbar_reducer';


export default combineReducers({
  playbar: playbarReducer
});
