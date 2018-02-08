import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import FollowToggle from '../follow_toggle/follow_toggle_container';

class InfoBar extends React.Component {
  constructor(props) {
    super(props);
  }

  followButton() {
    const { user, currentUser } = this.props;
    const isCurrentUser = (currentUser && user && user.id === parseInt(currentUser.id));
    if (user && !isCurrentUser) {
      return (
        <FollowToggle followee={user} type="INFO_BAR"/>
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
              return <InfoTabsItem key={idx} userId={userId} userShow={tab.userShow} text={tab.text} pathname={tab.pathname} style={this.props.style}/>;
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

const InfoTabsItem = ({ userShow, pathname, text, userId, idx, style}) => {
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

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(InfoBar)
);
