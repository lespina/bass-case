import React from 'react';

const QueueItem = ({ song, dimmed, handleTogglePlayback }) => {
  const { title, artist, imageUrl } = song;

  return (
    <div className={`queue-item ${dimmed}`}>

      <div className="queue-item-drag-handle"></div>
      <div className="queue-item-artwork">
        <div className="queue-item-artwork-image" style={{"backgroundImage": `url(${imageUrl})`}}></div>
        <div onClick={handleTogglePlayback} className="bc-btn queue-item-artwork-play-btn"></div>
      </div>
      <div className="queue-item-details-wrapper">
        <a className="queue-item-details-artist truncate">{artist.username}</a>
        <a className="queue-item-details-title truncate">{title}</a>
      </div>
      <div className="queue-item-details-duration">1:44</div>
    </div>
  );
};

export default QueueItem;
