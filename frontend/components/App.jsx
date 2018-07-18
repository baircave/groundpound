import React from 'react';
import LandingPage from './landing_page/landing_page';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import MainPage from './main_page/main_page';
import { withRouter } from 'react-router-dom';
import UploadTrack from './upload_track/upload_track';
import TrackShow from './tracks/track_show';
import AudioFooter from './audio_footer/audio_footer';

function App() {
  return (
    <div className="app">
      <AuthRoute exact path="/" component={LandingPage} />
      <ProtectedRoute exact path="/stream" component={MainPage} />
      <ProtectedRoute exact path="/upload" component={UploadTrack} />
      <ProtectedRoute exact path="/tracks/:id" component={TrackShow} />
      <AudioFooter></AudioFooter>
    </div>
  );
};

export default withRouter(App);
