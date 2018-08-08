import React from 'react';
// import { connect } from 'react-redux';
import CoverScroller from '../cover_scroller/cover_scroller';
import TrackIndex from '../tracks/track_index';
import TrackIndexItem from '../tracks/track_index_item';

const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <CoverScroller />
      <TrackIndex indexItemComponent={TrackIndexItem}
        listType="grid-list"></TrackIndex>
    </div>
  );
};

export default LandingPage;
