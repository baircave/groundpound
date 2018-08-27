import React from 'react';
import SidebarUserIndexItem from './sidebar_user_index_item';

export default function SidebarTrackIndex({ userIds, followingCount }) {
  if (!userIds) return null;
  
  return (
    <div className="sidebar-index-wrapper">
      <header className="sidebar-index-header">
        <i className="fas fa-users"></i> {followingCount} following
      </header>
      <ul className="sidebar-user-index flex-column">
        {userIds.map((id) => {
          return <SidebarUserIndexItem key={id} userId={id}></SidebarUserIndexItem>;
          })}
        </ul>
    </div>
  );
};
