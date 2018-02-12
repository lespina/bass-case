import React from 'react';
import StreamMainContent from './stream_main_content';

class StreamShow extends React.Component {
  render() {
    const { users, currentUser } = this.props;
    const user = users[currentUser.id];

    return (
      <div>
        <StreamMainContent currentUser={user} users={users}/>
      </div>
    );
  }
}

export default StreamShow;
