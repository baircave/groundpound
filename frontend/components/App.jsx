import React from 'react';
import { logout } from '../util/session_api_util';
import { connect } from 'react-redux';
import CoverScroller from './cover_scroller/cover_scroller';
import NavBar from './navbar';

function App({ loggedIn, logout }) {
  return (
    <div>
      { (!loggedIn) ?

        <CoverScroller /> : //need to add Search, Main, CurrentlyPlayingFooter here
        <NavBar />
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.id)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
