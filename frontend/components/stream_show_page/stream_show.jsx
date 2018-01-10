import React from 'react';
import StreamMainContent from './stream_main_content';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.fetched = false;
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
    this.fetched = true;
  }

  render() {
    if (!this.fetched) { return null; }

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
