import React from 'react';
import SidebarTrackIndexItem from './sidebar_track_index_item';

export default function SidebarTrackIndex({ trackIds, likeCount }) {
  if (!trackIds) return null;
  return (
    <div className="sidebar-index-wrapper">
      <header className="sidebar-index-header">
        <i className="fas fa-heart"></i> {likeCount} likes
      </header>
      <ul className="sidebar-track-index flex-column">
        {trackIds.map((id) => {
          return <SidebarTrackIndexItem key={id} trackId={id}></SidebarTrackIndexItem>;
          })}
        </ul>
    </div>
  );
};
