import React from 'react';
import NavBar from './navbar';
import TrackIndex from '../tracks/track_index';
import StreamTrackIndexItem from '../tracks/stream_track_index_item';

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
        <TrackIndex indexItemComponent={StreamTrackIndexItem}
          listType="stream-list"></TrackIndex>
      </div>
    </div>
  );
};

export default MainPage;
