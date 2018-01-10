import React from 'react';
import { Route } from 'react-router-dom';
import UserInfoBar from '../user_show_page/user_info_bar';
// import StreamContainer from './feed_container';
// import StreamSidebar from './stream_sidebar';

const StreamMainContent = ({ currentUser }) => {
  const tabs = [
    {text: 'Stream', pathname: ''},
    {text: 'Trending', pathname: 'trending'},
    {text: 'Discover', pathname: 'discover'},
  ];

  const style = {
    fontSize: "24px",
    lineHeight: "1.6",
  };

  return (
    <section className="relative user-main">
      <Route render={() => {
        return <UserInfoBar tabs={tabs} style={{ style }}/>;
      }}/>
      {/* <StreamContainer/> */}
      {/* <StreamSidebar currentUser={currentUser}/> */}
    </section>
  );
};

export default StreamMainContent;
