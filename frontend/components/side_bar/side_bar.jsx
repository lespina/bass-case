import React from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import shuffle from 'shuffle-array';
import { connect } from 'react-redux';
import { createFollow, deleteFollow } from '../../actions/follow_actions';
import UserSuggestionModule from './user_suggestion_module';
import * as FormatUtil from '../../util/format_util';

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
      selectedUsers.push(users.pop());
    }

    this.setState({ users: selectedUsers });
  }

  handleToggleFollow(userId) {
    const { users, currentUser } = this.props;

    if (!currentUser) {
      return (e) => {
        this.props.history.push('/login');
      };
    }

    const follows = users[currentUser.id].follows;

    return (e) => {
      if (userId in follows) {
        this.props.unfollow(follows[userId]);
      } else {
        this.props.follow(currentUser.id, userId);
      }
    };
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
        users={this.state.users}
        currentUser={this.props.users[currentUser.id]}
        handleToggleFollow={this.handleToggleFollow.bind(this)}
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
      if (user.followerIds.includes(parseInt(userId))) {
        followers.push(users[userId]);
      }
    }
    return <Followers
      user={user}
      followers={followers}
      currentUser={this.props.users[currentUser.id]}
      handleToggleFollow={this.handleToggleFollow.bind(this)}
    />
  }

  render() {
    return (
      <aside className="sidebar-right">
        {this.userSuggestionModule()}

        {this.infoStatsModule()}
        {this.descriptionModule()}
        {this.followers()}
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
            <div className="info-stat-value">{FormatUtil.formatPlays(user.numFollowers)}</div>
          </td>
          <td className="info-stat">
            <h3 className="info-stat-title">Following</h3>
            <div className="info-stat-value">{FormatUtil.formatPlays(user.numFollowing)}</div>
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

const Followers = ({ user, currentUser, followers, handleToggleFollow }) => {
  return (
    <section className="sidebar-module followers">
      <a className="sidebar-header" href="#">
        <h3 className="sidebar-header-title">
          <span className="sidebar-header-follower-icon"></span>
          <span>{FormatUtil.formatPlays(user.numFollowers)} Followers</span>
        </h3>
        <span className="sidebar-header-title">View all</span>
      </a>

      <div className="sidebar-content followers-content">
        <ul className="sidebar-user-avatar-list">
          {
            followers.map(follower => {
              return <FollowerItem key={follower.id} follower={follower} currentUser={currentUser} handleToggleFollow={handleToggleFollow}/>
            })
          }
        </ul>
      </div>
    </section>
  );
}

const FollowerItem = ({ follower, currentUser, handleToggleFollow }) => {
  const style = { backgroundImage: `url(${follower.avatarUrl})` };
  let active;
  if (!currentUser || !currentUser.follows) {
    active = false;
  } else {
    const follows = currentUser.follows;
    active = ((follower.id in follows) ? "active" : "");
  }

  return (
    <li className="user-avatar-list-item">
      <div className="user-avatar-list-item-body" style={style}>
        <div className="floating-user-menu">
          <div className="floating-user-content">
            <div className="floating-user-content-avatar" style={style} ></div>
            <div className="floating-user-content-description">{follower.username}</div>
            <div className="floating-user-content-stats">
              <a className="floating-user-content-stats-followers" href="#">{FormatUtil.formatPlays(follower.numFollowers)}</a>
            </div>
            <div className="floating-user-content-location">{follower.location}</div>
            <button onClick={handleToggleFollow(follower.id)} className={`bc-btn floating-user-content-follow-btn ${active}`} type="button">{(active === "active") ? "Following" : "Follow"}</button>
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

const mapDispatchToProps = (dispatch) => ({
  follow: (userId, songId) => dispatch(createFollow(userId, songId)),
  unfollow: (followId) => dispatch(deleteFollow(followId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar));
