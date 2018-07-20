import React from 'react';
// import { connect } from 'react-redux';
import CoverScroller from '../cover_scroller/cover_scroller';
import TrackIndex from '../tracks/track_index';

const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <CoverScroller />
      <TrackIndex></TrackIndex>
    </div>
  );
};

export default LandingPage;
