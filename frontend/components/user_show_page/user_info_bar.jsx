import React from 'react';
import { NavLink } from 'react-router-dom';

class UserInfoBar extends React.Component {
  constructor(props) {
    super(props);
  }

  followButton() {
    const { user, currentUserId } = this.props;
    const isCurrentUser = (user.id === parseInt(currentUserId));

    if (!isCurrentUser) {
      return (
        <button type="button" className="bc-btn user-info-follow-btn">Follow</button>
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
        <button type="button" className="bc-btn user-info-edit-btn">Edit</button>
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

export default UserInfoBar;
