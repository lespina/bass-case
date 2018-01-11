import React from 'react';
import UserStreamContainer from './user_stream_container';
import Sidebar from '../side_bar/side_bar';

const UserMainContent = ({ user }) => {
  return (
    <section className="relative">
      <UserStreamContainer user={user}/>
      <Sidebar user={user} infoStats={true} description={true} followers={true} following={true}/>
    </section>
  );
};

export default UserMainContent;
