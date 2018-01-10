import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { createFollow, deleteFollow } from '../../actions/follow_actions';

class UserInfoBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleFollow = this.handleToggleFollow.bind(this);
  }

  handleToggleFollow(e) {
    e.preventDefault();
    const { users, currentUser, user, deleteFollow, createFollow } = this.props;
    const follows = users[currentUser.id].follows;

    if (user.id in follows) {
      this.props.unfollow(follows[user.id]);
    } else {
      this.props.follow(currentUser.id, user.id);
    }
  }

  followButton() {
    const { user, currentUser, users } = this.props;

    if (!user) { return null; }

    const isCurrentUser = (currentUser && user.id === parseInt(currentUser.id));
    const follows = users[currentUser.id].follows;
    const followStatus = (follows && user.id in follows);
    const followClassname = ((followStatus) ? "following" : "");

    if (!isCurrentUser) {
      return (
        <button onClick={this.handleToggleFollow} type="button" className={`bc-btn user-info-follow-btn ${followClassname}`}>
          {
            (followStatus) ? "Following" : "Follow"
          }
        </button>
      );
    } else {
      return <div></div>;
    }
  }

  editButton() {
    const { user, currentUser } = this.props;
    const isCurrentUser = (currentUser && user && user.id === parseInt(currentUser.id));

    if (isCurrentUser) {
      return (
        <Link to={`/users/${user.id}/edit`} className="bc-btn user-info-edit-btn">Edit</Link>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const userId = ((this.props.user) ? this.props.user.id : null);

    return (
      <section className="user-info-bar">
        <ul className="user-info-tabs">
          {
            this.props.tabs.map((tab, idx) => {
              return <UserInfoTabsItem key={idx} userId={userId} userShow={tab.userShow} text={tab.text} pathname={tab.pathname} style={this.props.style}/>;
            }, this)
          }
        </ul>
        <div className="user-info-buttons">
          {this.followButton()}
          {this.editButton()}
        </div>
      </section>
    );
  }
}

const UserInfoTabsItem = ({ userShow, pathname, text, userId, idx, style}) => {
  const exact = ((pathname === '') ? { exact: true } : {});
  const prefix = ((userShow) ? `/users/${userId}` : ``);

  return (
    <li className="user-info-tabs-item">
      <NavLink {...exact} {...style} to={`${prefix}/${pathname}`} className="user-info-tabs-link">{text}</NavLink>
    </li>
  );
};

const mapStateToProps = (state) => ({
  users: state.entities.users,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  follow: (followerId, followeeId) => dispatch(createFollow(followerId, followeeId)),
  unfollow: (followId) => dispatch(deleteFollow(followId)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserInfoBar)
);
