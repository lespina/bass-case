import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';

const QueueItemHandle = SortableHandle(() => {
  return (
    <div className="queue-item-drag-handle"></div>
  );
});

const QueueItem = ({
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
}) => {
  let ourPausedClass = paused;
  if (song.id !== parseInt(currentSongId)) { ourPausedClass = ""; }
  const { title, imageUrl } = song;
  const active = ((currentUser && currentUser.likes && song.id in currentUser.likes) ? 'active' : '' );
  return (
    <div className={`queue-item ${dimmed}`}>
      <div className={`queue-item-actions ${open}`}>
        <button onClick={handleToggleLike} className={`bc-btn playable-like-btn queue-like-btn ${active}`}>Like</button>
        <div onClick={updateMoreActions} className={`bc-btn playable-more-btn queue-more-btn ${open}`}>
          <div className={`more-actions queue-actions-menu ${open}`}>
            <button onClick={handleToggleLike} className={`more-actions-btn more-like-btn ${active}`}>Like</button>
            <button onClick={addToNextUp.bind(null, song.id)} className="more-actions-btn more-add-next-up-btn">Add to Next up</button>
            <button onClick={handleToggleRepost} className={`more-actions-btn more-repost-btn ${active}`}>Repost</button>
          </div>
        </div>
      </div>
      <QueueItemHandle/>
      <div className="queue-item-artwork">
        <div className="queue-item-artwork-image" style={{"backgroundImage": `url(${imageUrl})`}}></div>
        <div onClick={handleTogglePlayback} className={`bc-btn queue-item-artwork-play-btn ${ourPausedClass}`}></div>
      </div>
      <div className="queue-item-details-wrapper">
        <Link to={`/users/${artist.id}`} className="queue-item-details-artist truncate">{artist.username}</Link>
        <a className="queue-item-details-title truncate">{title}</a>
      </div>
      {/* <div className="queue-item-details-duration">1:44</div> */}
    </div>
  );
};

export default SortableElement(QueueItem);
