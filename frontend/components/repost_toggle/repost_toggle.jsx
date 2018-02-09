import React from 'react';

class RepostToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleRepost = this.handleToggleRepost.bind(this);
  }

  currentUser() {
    const { users, sessionCurrentUser } = this.props;
    if (sessionCurrentUser) return users[sessionCurrentUser.id];
    return null;
  }

  handleToggleRepost(e) {
    e.preventDefault();
    const { song, deleteRepost, createRepost } = this.props;
    const currentUser = this.currentUser();

    if (!currentUser) {
      this.props.history.push('/login');
      return;
    }

    if (currentUser.repostedSongIds.has(song.id)) {
      deleteRepost(song.id);
    } else {
      createRepost(song.id);
    }
  }

  render() {
    const { song, type } = this.props;
    const currentUser = this.currentUser();

    if (!currentUser.repostedSongIds) { return; }

    const active = ((currentUser && currentUser.repostedSongIds.has(song.id)) ? 'active' : '' );
    const repostText = ((currentUser && currentUser.repostedSongIds.has(song.id)) ? 'Reposted' : 'Repost' );

    let content;
    switch (type) {
      case 'QUEUE_ITEM':
        content = <button onClick={this.handleToggleRepost} className={`more-actions-btn more-repost-btn ${active}`}>{repostText}</button>;
        break;
      case 'STREAM_INDEX_ITEM':
        content = <button onClick={this.handleToggleRepost} type="button" className={`bc-btn sound-actions-btn action-repost ${active}`}>{song.numReposts}</button>;
        break;
    }

    return (
      content
    );
  }
}

export default RepostToggle;
