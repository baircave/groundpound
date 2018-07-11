import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './store/store';
import Root from './components/root';


document.addEventListener("DOMContentLoaded", () => {
  let preloadedState = {}
  if (window.currentUser) {
    preloadedState = {
      session: {
        id: window.currentUser.id
      },
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser
        }
      }
    };
  }

  const store = configureStore(preloadedState);
  delete window.currentUser;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={ store } />, root);
});
