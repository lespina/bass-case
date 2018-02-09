import React from 'react';

class FollowToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleFollow = this.handleToggleFollow.bind(this);
  }

  currentUser() {
    const { users, sessionCurrentUser } = this.props;
    if (sessionCurrentUser) return users[sessionCurrentUser.id];
    return null;
  }

  handleToggleFollow(e) {
    e.preventDefault();
    const { followee, deleteFollow, createFollow } = this.props;
    const currentUser = this.currentUser();

    if (!currentUser) {
      this.props.history.push('/login');
      return;
    }

    if (currentUser.followeeIds.has(followee.id)) {
      deleteFollow(followee.id);
    } else {
      createFollow(followee.id);
    }
  }

  render() {
    const { followee, type } = this.props;
    const currentUser = this.currentUser();

    if (!currentUser || !currentUser.followeeIds) { return null; }

    const active = ((currentUser && currentUser.followeeIds.has(followee.id)) ? 'active' : '' );
    const followText = ((currentUser && currentUser.followeeIds.has(followee.id)) ? 'Following' : 'Follow' );

    let content;
    switch (type) {
      case 'USER_SUGGESTION_MODULE':
        content = <button onClick={this.handleToggleFollow} className={`bc-btn user-suggestion-follow-btn ${active}`} type="button">{followText}</button>;
        break;
      case 'FLOATING_USER_CONTENT':
        content = <button onClick={this.handleToggleFollow} className={`bc-btn floating-user-content-follow-btn ${active}`} type="button">{followText}</button>;
        break;
      case 'INFO_BAR':
        content = <button onClick={this.handleToggleFollow} className={`bc-btn user-info-follow-btn ${active}`} type="button" >{followText}</button>;
        break;
    }

    return (
      content
    );
  }
}

export default FollowToggle;
