import React from 'react';
import UserStream from './user_stream';
import UserSidebar from './user_sidebar';

const UserMainContent = ({ user }) => {
  return (
    <section className="relative">
      <UserStream user={user}/>
      <UserSidebar user={user}/>
    </section>
  );
};

export default UserMainContent;
