import React from 'react';
import Sound from 'react-sound'

const SongIndexItem = ({ idx, song }) => {
  const { title, artist, imageUrl, audioUrl } = song;

  return (
    <li className="song-index-item">
      <div>
        <div className="playable-tile">
          <div className="playable-tile-artwork" style={{"backgroundImage": `url(${imageUrl})`}}>
            <div className="play-button">
              <a href="#">Play</a>
            </div>
          </div>

          <div className="playable-tile-description">
            <div className="playable-tile-description-title">
              <a className="truncate" href="#">{title}</a>
            </div>
            <div className="playable-tile-description-username">
              <a className="truncate" href="#">{artist.username}</a>
            </div>
          </div>
        </div>
      </div>
      <Sound
        url={audioUrl}
        playStatus={(idx === 0) ? Sound.status.PLAYING : ""}
      ></Sound>
    </li>
  );
};

export default SongIndexItem;