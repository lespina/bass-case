import React from 'react';
import { Link } from 'react-router-dom';

class SongIndexItem extends React.Component {

  render() {
    const { paused, handleTogglePlayback, song, artist } = this.props;
    const { title, imageUrl, audioUrl } = song;

    return (
      <li className="song-index-item">
        <div>
          <div className="playable-tile">
            <div className="playable-tile-artwork" style={{"backgroundImage": `url(${imageUrl})`}}>
              <div className="play-button">
                <a className={`play-button-link ${paused}`} onClick={handleTogglePlayback} href="#">Play</a>
              </div>
            </div>

            <div className="playable-tile-description">
              <div className="playable-tile-description-title">
                <a className="truncate" href="#">{title}</a>
              </div>
              <div className="playable-tile-description-username">
                <Link className="truncate" to={`/users/${artist.id}`}>{artist.username}</Link>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default SongIndexItem;
