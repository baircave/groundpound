import React from 'react';
import SidebarTrackIndexItem from './sidebar_track_index_item';
import { NavLink } from 'react-router-dom';

export default function SidebarTrackIndex({ trackIds, likeCount, userId }) {
  if (!trackIds) return null;

  const firstThree = trackIds.slice(0, 3);
  const likesRoute = `/users/${userId}/likes`;

  return (
    <div className="sidebar-index-wrapper">
      <header className="sidebar-index-header flex space-between">
        <div>
          <i className="fas fa-heart"></i> {likeCount} likes
        </div>
        <NavLink className="view-all" to={likesRoute}>View all</NavLink>
      </header>
      <ul className="sidebar-track-index flex-column">
        {firstThree.map((id) => {
          return <SidebarTrackIndexItem key={id} trackId={id} trackIds={firstThree}></SidebarTrackIndexItem>;
          })}
        </ul>
    </div>
  );
};
