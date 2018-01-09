import React from 'react';
import UserStreamContainer from './user_stream_container';
import UserSidebar from './user_sidebar';

const UserMainContent = ({ user }) => {
  return (
    <section className="relative">
      <UserStreamContainer user={user}/>
      <UserSidebar user={user}/>
    </section>
  );
};

export default UserMainContent;
