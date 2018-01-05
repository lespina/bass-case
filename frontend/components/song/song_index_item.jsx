import React from 'react';

class SongIndexItem extends React.Component {

  render() {
    const { paused, handleTogglePlayback, song } = this.props;
    console.log("LOOK AT ME", paused);
    const { title, artist, imageUrl, audioUrl } = song;

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
                <a className="truncate" href="#">{artist.username}</a>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default SongIndexItem;
