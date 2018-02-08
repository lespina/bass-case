import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import shuffle from 'shuffle-array';
import { connect } from 'react-redux';
import UserSuggestionModule from './user_suggestion_module';
import FollowToggle from '../follow_toggle/follow_toggle_container';
import * as FormatUtil from '../../util/format_util';

const ROW_LIMIT = 9;

class SideBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  chooseUsers() {
    const { currentUser } = this.props;

    let users;
    if (!currentUser) {
      users = _.values(this.props.users);
    } else {
      const allUsersButCurrentUser = _.merge({}, this.props.users);
      delete allUsersButCurrentUser[currentUser.id];
      users = _.values(allUsersButCurrentUser);
    }

    const selectedUsers = [];

    while (selectedUsers.length < 3) {
      shuffle(users);
      selectedUsers.push(users[0].id);
      users.shift();
    }

    this.setState({ users: selectedUsers });
  }

  userSuggestionModule() {
    const { userSuggestion, currentUser } = this.props;

    if (!userSuggestion) { return null; }

    if (!this.state.users) {
      this.chooseUsers();
      return null;
    }

    return (
      <UserSuggestionModule
        users={this.props.users}
        userIds={this.state.users}
        currentUser={this.props.users[currentUser.id]}
        refresh={this.chooseUsers.bind(this)}
      />
    );
  }

  infoStatsModule() {
    const { infoStats } = this.props;
    if (!infoStats) { return null; }
    return <InfoStatsModule user={this.props.user}/>;
  }

  descriptionModule() {
    const { description } = this.props;
    if (!description) { return null; }
    return <Description user={this.props.user}/>;
  }

  followers() {
    const { users, user, currentUser } = this.props;
    if (!this.props.followers || !user.followerIds) { return null; }
    const followers = [];
    for (const userId in users) {
      if (user.followerIds.has(parseInt(userId))) {
        followers.push(users[userId]);
      }
      if (followers.length >= ROW_LIMIT) {
        break;
      }
    }

    return <FollowersIndex
      user={user}
      followers={followers}
      currentUser={this.props.users[currentUser.id]}
    />;
  }

  following() {
    const { users, user, currentUser } = this.props;
    if (!this.props.following || !user.followeeIds) { return null; }
    const followees = [];
    for (const userId in users) {
      if (user.followeeIds.has(parseInt(userId))) {
        followees.push(users[userId]);
      }
      if (followees.length >= ROW_LIMIT) {
        break;
      }
    }
    return <FollowingIndex
      user={user}
      followees={followees}
      currentUser={this.props.users[currentUser.id]}
    />;

  }

  render() {
    return (
      <aside className="sidebar-right">
        {this.userSuggestionModule()}

        {this.infoStatsModule()}
        {this.descriptionModule()}
        {this.followers()}
        {this.following()}
      </aside>
    );
  }
}

const InfoStatsModule = ({ user }) => {
  return (
    <table className="user-info-stats-table">
      <tbody>
        <tr>
          <td className="info-stat">
            <h3 className="info-stat-title">Followers</h3>
            <div className="info-stat-value">{FormatUtil.formatPlays(user.followerIds.size)}</div>
          </td>
          <td className="info-stat">
            <h3 className="info-stat-title">Following</h3>
            <div className="info-stat-value">{FormatUtil.formatPlays(user.followeeIds.size)}</div>
          </td>
          <td className="info-stat">
            <h3 className="info-stat-title">Tracks</h3>
            <div className="info-stat-value">{FormatUtil.formatPlays(user.songIds.length)}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const Description = ({ user }) => {
  return (
    <div className="user-info-stats-description">
      <div className="truncated-description-wrapper">
        <p className="truncated-description">
          {user.bio}
        </p>
      </div>
    </div>
  );
}

const FollowersIndex = ({ user, currentUser, followers }) => {
  return (
    <section className="sidebar-module followers">
      <a className="sidebar-header" href="#">
        <h3 className="sidebar-header-title">
          <span className="sidebar-header-follower-icon"></span>
          <span>{FormatUtil.formatPlays(user.followerIds.size)} Followers</span>
        </h3>
        {/* <span className="sidebar-header-title">View all</span> */}
      </a>

      <div className="sidebar-content followers-content">
        <ul className="sidebar-user-avatar-list">
          {
            followers.map(follower => {
              return <FollowerItem key={follower.id} follower={follower} currentUser={currentUser}/>
            })
          }
        </ul>
      </div>
    </section>
  );
}

const FollowingIndex = ({ user, currentUser, followees }) => {
  return (
    <section className="sidebar-module followers">
      <a className="sidebar-header" href="#">
        <h3 className="sidebar-header-title">
          <span className="sidebar-header-follower-icon"></span>
          <span>{FormatUtil.formatPlays(user.followeeIds.size)} Following</span>
        </h3>
        {/* <span className="sidebar-header-title">View all</span> */}
      </a>

      <div className="sidebar-content followers-content">
        <ul className="sidebar-user-avatar-list">
          {
            followees.map(followee => {
              return <FollowingItem key={followee.id} followee={followee} currentUser={currentUser}/>
            })
          }
        </ul>
      </div>
    </section>
  );
}

const FollowerItem = ({ follower, currentUser }) => {
  const style = { backgroundImage: `url(${follower.avatarUrl})` };
  const lower = ((follower.avatarUrl[0] === '/') ? { top: '-205px' } : {});

  return (
    <li className="user-avatar-list-item">
      <div className="user-avatar-list-item-body" style={style}>
        <div className="floating-user-menu" style={lower}>
          <div className="floating-user-content">
            <Link to={`/users/${follower.id}`} className="floating-user-content-avatar" style={style} ></Link>
            <Link to={`/users/${follower.id}`} className="floating-user-content-description">{follower.username}</Link>
            <div className="floating-user-content-stats">
              <a className="floating-user-content-stats-followers" href="#">{FormatUtil.formatPlays(follower.followerIds.size)}</a>
            </div>
            <div className="floating-user-content-location">{follower.location}</div>
            <FollowToggle followee={follower} type="FLOATING_USER_CONTENT"/>
          </div>
          <div className="floating-user-menu-arrow"></div>
          </div>
      </div>
    </li>
  );
}

const FollowingItem = ({ followee, currentUser }) => {
  const style = { backgroundImage: `url(${followee.avatarUrl})` };
  const lower = ((followee.avatarUrl[0] === '/') ? { top: '-205px' } : {});

  return (
    <li className="user-avatar-list-item">
      <div className="user-avatar-list-item-body" style={style}>
        <div className="floating-user-menu" style={lower}>
          <div className="floating-user-content">
            <Link to={`/users/${followee.id}`} className="floating-user-content-avatar" style={style} ></Link>
            <Link to={`/users/${followee.id}`} className="floating-user-content-description">{followee.username}</Link>
            <div className="floating-user-content-stats">
              <a className="floating-user-content-stats-followers" href="#">{FormatUtil.formatPlays(followee.followerIds.size)}</a>
            </div>
            <div className="floating-user-content-location">{followee.location}</div>
            <FollowToggle followee={followee} type="FLOATING_USER_CONTENT"/>
          </div>
          <div className="floating-user-menu-arrow"></div>
          </div>
      </div>
    </li>
  );
}


const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  users: state.entities.users,
});

export default connect(
  mapStateToProps,
  null
)(withRouter(SideBar));
