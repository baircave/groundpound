import React from 'react';
import LandingPage from './landing_page/landing_page';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import MainPage from './main_page/main_page';
import { withRouter, Route } from 'react-router-dom';
import UploadTrack from './upload_track/upload_track';
import TrackShow from './tracks/track_show';
import AudioFooter from './playbar/playbar';
import Modal from './modal';
import Navbar from './main_page/navbar';
import { connect } from 'react-redux';
import UserProfile from './users/user_profile';
import Likes from './users/likes';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Modal />
        <Navbar />
        <AuthRoute exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/stream" component={MainPage} />
        <ProtectedRoute exact path="/upload" component={UploadTrack} />
        <Route exact path="/users/:id/likes" component={Likes} />
        <Route exact path="/tracks/:id" component={TrackShow} />
        <Route exact path="/users/:id" component={UserProfile} />
        <AudioFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playing: state.ui.playbar.playing,
    visible: state.ui.playbar.visible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayPause: (bool) => dispatch(togglePlayPause(bool))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
