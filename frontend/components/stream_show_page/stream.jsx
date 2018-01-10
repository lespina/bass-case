import React from 'react';
import { Route } from 'react-router-dom';
import UserInfoBar from '../user_show_page/user_info_bar';
// import StreamMainContent from './stream_main_content';
import StreamHeroImage from './stream_hero_image';

class Stream extends React.Component {
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

    const tabs = [
      {text: 'Stream', pathname: ''},
      {text: 'Trending', pathname: 'trending'},
      {text: 'Discover', pathname: 'discover'},
    ];

    return (
      <div>
        <StreamHeroImage currentUser={this.props.currentUser}/>
        <Route render={() => {
          return <UserInfoBar tabs={tabs} user={user}/>;
        }}/>
        {/* <StreamMainContent currentUser={user} users={users}/> */}
      </div>
    );
  }
}

export default Stream;
