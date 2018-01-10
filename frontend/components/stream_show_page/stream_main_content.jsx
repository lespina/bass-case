import React from 'react';
import { Route } from 'react-router-dom';
import InfoBar from '../info_bar/info_bar';
import StreamContainer from './stream_container';
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
        return <InfoBar tabs={tabs} style={{ style }}/>;
      }}/>
      {/* <StreamContainer/> */}
      {/* <StreamSidebar currentUser={currentUser}/> */}
    </section>
  );
};

export default StreamMainContent;
