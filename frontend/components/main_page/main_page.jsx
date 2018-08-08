import React from 'react';
import NavBar from './navbar';
import TrackIndex from '../tracks/track_index';
import StreamTrackIndexItem from '../tracks/stream_track_index_item';

const MainPage = (props) => {
  return (
    <div className="main-page">
      <div className="track-index-wrapper">
        <TrackIndex indexItemComponent={StreamTrackIndexItem}
          listType="stream-list"></TrackIndex>
      </div>
    </div>
  );
};

export default MainPage;
