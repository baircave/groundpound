import React from 'react';
import NavBar from './navbar';
import TrackIndex from '../tracks/track_index';
import StreamTrackIndexItem from '../tracks/stream_track_index_item';
import StreamSidebar from '../users/stream_sidebar';

const MainPage = (props) => {
  return (
    <div className="main-page">
      <div className="track-index-wrapper">
        <div className="max-min-width">
          <div className="label-select-with-buttons">
            <div>
              <h2 className="index-label">Tracks</h2>
            </div>
          </div>
        </div>
        <div className="index-and-sidebar">
          <TrackIndex indexItemComponent={StreamTrackIndexItem}
            listType="stream-list"></TrackIndex>
          <StreamSidebar></StreamSidebar>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
