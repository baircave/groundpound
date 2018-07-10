import ReactDOM from 'react-dom';
import React from 'react';
// import configureStore from './store/store';


console.log("hello");
document.addEventListener("DOMContentLoaded", () => {
  console.log("world");
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

  // const store = configureStore(preloadedState);
  delete window.currentUser;
  const root = document.getElementById("root");
  ReactDOM.render(<p>We out here</p>, root);
});
