import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';

const QueueItemHandle = SortableHandle(() => {
  return (
    <div className="queue-item-drag-handle"></div>
  );
});

class QueueItem extends React.Component {

  artistLink() {
    const { artist, currentUser } = this.props;
    if (currentUser) {
      return <Link to={`/users/${artist.id}`} className="queue-item-details-artist truncate">{artist.username}</Link>;
    } else {
      return <a onClick={this.props.redirectToLogin.bind(this)} href={`/users/${artist.id}`} className="queue-item-details-artist truncate">{artist.username}</a>;
    }
  }

  render() {
    const {
      currentUser,
      currentSongId,
      paused,
      song,
      dimmed,
      handleTogglePlayback,
      handleToggleLike,
      addToNextUp,
      open,
      updateMoreActions,
      artist,
      handleToggleRepost
    } = this.props;

    let ourPausedClass = paused;
    if (song.id !== parseInt(currentSongId)) { ourPausedClass = ""; }
    const { title, imageUrl } = song;
    const activeLikes = ((currentUser && currentUser.likes && song.id in currentUser.likes) ? 'active' : '' );
    const likeText = ((currentUser && currentUser.likes && song.id in currentUser.likes) ? 'Liked' : 'Like' );
    const activeReposts = ((currentUser && currentUser.reposts && song.id in currentUser.reposts) ? 'active' : '' );
    const repostText = ((currentUser && currentUser.reposts && song.id in currentUser.reposts) ? 'Reposted' : 'Repost' );
    return (
      <div className={`queue-item ${dimmed}`}>
        <div className={`queue-item-actions ${open}`}>
          <button onClick={handleToggleLike} className={`bc-btn playable-like-btn queue-like-btn ${activeLikes}`}>Like</button>
          <div onClick={updateMoreActions} className={`bc-btn playable-more-btn queue-more-btn ${open}`}>
            <div className={`more-actions queue-actions-menu ${open}`}>
              <button onClick={handleToggleLike} className={`more-actions-btn more-like-btn ${activeLikes}`}>{likeText}</button>
              <button onClick={addToNextUp.bind(null, song.id)} className="more-actions-btn more-add-next-up-btn">Add to Next up</button>
              <button onClick={handleToggleRepost} className={`more-actions-btn more-repost-btn ${activeReposts}`}>{repostText}</button>
            </div>
          </div>
        </div>
        <QueueItemHandle/>
        <div className="queue-item-artwork">
          <div className="queue-item-artwork-image" style={{"backgroundImage": `url(${imageUrl})`}}></div>
          <div onClick={handleTogglePlayback} className={`bc-btn queue-item-artwork-play-btn ${ourPausedClass}`}></div>
        </div>
        <div className="queue-item-details-wrapper">
          {this.artistLink()}
          <a className="queue-item-details-title truncate">{title}</a>
        </div>
      </div>
    );
  }
}

export default SortableElement(QueueItem);
