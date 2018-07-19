import { combineReducers } from 'redux';
import playbarReducer from './playbar_reducer';
import modalReducer from './modal_reducer';
import navbarReducer from './navbar_reducer';


export default combineReducers({
  playbar: playbarReducer,
  navbar: navbarReducer,
  modal: modalReducer
});
