import React from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import shuffle from 'shuffle-array';
import { connect } from 'react-redux';
import { createFollow, deleteFollow } from '../../actions/follow_actions';
import UserSuggestionModule from './user_suggestion_module';

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

  render() {
    return (
      <aside className="sidebar-right">
        {this.userSuggestionModule()}

        {this.infoStatsModule()}
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
            <div className="info-stat-value">408K</div>
          </td>
          <td className="info-stat">
            <h3 className="info-stat-title">Following</h3>
            <div className="info-stat-value">365</div>
          </td>
          <td className="info-stat">
            <h3 className="info-stat-title">Tracks</h3>
            <div className="info-stat-value">66</div>
          </td>
        </tr>
      </tbody>
    </table>
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
