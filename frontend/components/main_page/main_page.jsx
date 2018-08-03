import React from 'react';
import NavBar from './navbar';
import TrackIndex from '../tracks/track_index';

const MainPage = (props) => {
  return (
    <div className="main-page">
      <NavBar></NavBar>
      <div className="track-index-wrapper">
        <TrackIndex></TrackIndex>
      </div>
    </div>
  );
};

export default MainPage;
