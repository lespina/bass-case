import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { createFollow, deleteFollow } from '../../actions/follow_actions';

class UserInfoBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleFollow = this.handleToggleFollow.bind(this);
  }

  handleToggleFollow(e) {
    e.preventDefault();
    const { users, currentUserId, user, deleteFollow, createFollow } = this.props;
    const currentUser = users[currentUserId];

    if (currentUserId in user.follows) {
      this.props.unfollow(user.follows[currentUser.id]);
    } else {
      this.props.follow(currentUserId, user.id);
    }
  }

  followButton() {
    const { user, currentUserId } = this.props;
    const isCurrentUser = (user.id === parseInt(currentUserId));
    const followStatus = (user.follows && currentUserId in user.follows);

    if (!isCurrentUser) {
      return (
        <button onClick={this.handleToggleFollow} type="button" className="bc-btn user-info-follow-btn">
          {
            (followStatus) ? "Unfollow" : "Follow"
          }
        </button>
      );
    } else {
      return <div></div>;
    }
  }

  editButton() {
    const { user, currentUserId } = this.props;
    const isCurrentUser = (user.id === parseInt(currentUserId));

    if (isCurrentUser) {
      return (
        <Link to={`/users/${user.id}/edit`} className="bc-btn user-info-edit-btn">Edit</Link>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const userId = this.props.user.id;

    return (
      <section className="user-info-bar">
        <ul className="user-info-tabs">
          <li className="user-info-tabs-item">
            <NavLink exact to={`/users/${userId}`} className="user-info-tabs-link">All</NavLink>
          </li>
          <li className="user-info-tabs-item">
            <NavLink to={`/users/${userId}/tracks`} className="user-info-tabs-link">Tracks</NavLink>
          </li>
          <li className="user-info-tabs-item">
            <NavLink to={`/users/${userId}/albums`} className="user-info-tabs-link">Albums</NavLink>
          </li>
          <li className="user-info-tabs-item">
            <NavLink to={`/users/${userId}/playlists`} className="user-info-tabs-link">Playlists</NavLink>
          </li>
          <li className="user-info-tabs-item">
            <NavLink to={`/users/${userId}/reposts`} className="user-info-tabs-link">Reposts</NavLink>
          </li>
        </ul>
        <div className="user-info-buttons">
          {this.followButton()}
          {this.editButton()}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.entities.users
});

const mapDispatchToProps = (dispatch) => ({
  follow: (followerId, followeeId) => dispatch(createFollow(followerId, followeeId)),
  unfollow: (followId) => dispatch(deleteFollow(followId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoBar);
