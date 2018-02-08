import React from 'react';

class LikeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleLike = this.handleToggleLike.bind(this);
  }

  currentUser() {
    const { users, currentUserId } = this.props;
    return users[currentUserId];
  }

  handleToggleLike(e) {
    e.preventDefault();
    const { song, deleteLike, createLike } = this.props;
    const currentUser = this.currentUser();

    if (!currentUser) {
      this.props.history.push('/login');
      return;
    }

    if (currentUser.likedSongIds.has(song.id)) {
      deleteLike(song.id);
    } else {
      createLike(song.id);
    }
  }

  render() {
    const { song, type } = this.props;
    const currentUser = this.currentUser();
    const likeActive = ((currentUser.likedSongIds.has(song.id)) ? 'active' : '' );
    const likeText = ((currentUser.likedSongIds.has(song.id)) ? 'Liked' : 'Like' );

    let content;
    switch (type) {
      case 'STREAM_INDEX_ITEM':
        content = <button onClick={this.handleToggleLike} type="button" className={`bc-btn sound-actions-btn action-like ${likeActive}`}>{song.numLikes}</button>;
        break;
      case 'QUEUE_ITEM':
        content = <button onClick={this.handleToggleLike} className={`bc-btn playable-like-btn queue-like-btn ${likeActive}`}>Like</button>;
        break;
      case 'QUEUE_ITEM_ACTION':
        content = <button onClick={this.handleToggleLike} className={`more-actions-btn more-like-btn ${likeActive}`}>{likeText}</button>;
        break;
      case 'PLAY_BAR':
        content = <div onClick={this.handleToggleLike} className={`playbar-like ${likeActive}`}></div>;
        break;
    }

    return (
      content
    );
  }
}

export default LikeToggle;
