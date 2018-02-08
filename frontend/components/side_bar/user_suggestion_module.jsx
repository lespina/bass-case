import React from 'react';
import _ from 'lodash';
import UserSuggestionItem from './user_suggestion_item';

const UserSuggestionModule = ({ refresh, users, userIds, currentUser }) => {
  const selectedUsers = _.values(users).filter((user) => {
    return userIds.includes(user.id);
  });

  return (
    <section className="sidebar-module who-to-follow">
      <a className="sidebar-header" href="#">
        <h3 className="sidebar-header-title">
          <span className="sidebar-header-follower-icon"></span>
          <span>Who to follow</span>
        </h3>
        <span onClick={refresh} className="sidebar-header-refresh">Refresh</span>
      </a>

      <div className="sidebar-content">
        <ul className="sidebar-list">
          {
            selectedUsers.map(user => {
              return <UserSuggestionItem key={user.id} user={user}/>;
            })
          }
        </ul>
      </div>
    </section>
  );
};

export default UserSuggestionModule;
