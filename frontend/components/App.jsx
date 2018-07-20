import React from 'react';
import LandingPage from './landing_page/landing_page';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import MainPage from './main_page/main_page';
import { withRouter, Route } from 'react-router-dom';
import UploadTrack from './upload_track/upload_track';
import TrackShow from './tracks/track_show';
import AudioFooter from './audio_footer/audio_footer';
import Modal from './modal';
import Navbar from './main_page/navbar';
import { togglePlayPause } from '../actions/playbar_actions';
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  handleKeyPress(e) {
    // console.log("here");
    // if (this.props.visible) {
    //   if (e.key === ' ') {
    //     this.props.togglePlayPause(!this.props.playing);
    //   }
    // }
  }

  render() {
    return (
      <div onKeyPress={this.handleKeyPress.bind(this)} className="app">
        <Modal />
        <Navbar />
        <AuthRoute exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/stream" component={MainPage} />
        <ProtectedRoute exact path="/upload" component={UploadTrack} />
        <Route exact path="/tracks/:id" component={TrackShow} />
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
