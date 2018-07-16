import React from 'react';
import { logout } from '../util/session_api_util';
import { connect } from 'react-redux';
import LandingPage from './landing_page/landing_page';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import MainPage from './main_page/main_page';
import { withRouter } from 'react-router-dom';
import UploadTrack from './upload_track/upload_track';
import TrackShow from './tracks/track_show';

function App({ loggedIn, logout }) {
  return (
    <div>
      <AuthRoute exact path="/" component={LandingPage} />
      <ProtectedRoute exact path="/stream" component={MainPage} />
      <ProtectedRoute exact path="/upload" component={UploadTrack} />
      <ProtectedRoute exact path="/tracks/:id" component={TrackShow} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
