import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const QueueItemHandle = SortableHandle(() => {
  return (
    <div className="queue-item-drag-handle"></div>
  );
});

const QueueItem = ({ currentSongId, paused, song, dimmed, handleTogglePlayback }) => {
  let ourPausedClass = paused;
  if (song.id !== parseInt(currentSongId)) { ourPausedClass = ""; }
  const { title, artist, imageUrl } = song;

  return (
    <div className={`queue-item ${dimmed}`}>

      <QueueItemHandle/>
      <div className="queue-item-artwork">
        <div className="queue-item-artwork-image" style={{"backgroundImage": `url(${imageUrl})`}}></div>
        <div onClick={handleTogglePlayback} className={`bc-btn queue-item-artwork-play-btn ${ourPausedClass}`}></div>
      </div>
      <div className="queue-item-details-wrapper">
        <a className="queue-item-details-artist truncate">{artist.username}</a>
        <a className="queue-item-details-title truncate">{title}</a>
      </div>
      {/* <div className="queue-item-details-duration">1:44</div> */}
    </div>
  );
};

export default SortableElement(QueueItem);
