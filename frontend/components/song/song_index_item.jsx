import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SongIndexItem extends React.Component {
  redirectToLogin() {
    this.props.history.push('/login');
    return;
  }

  render() {
    const {
      paused,
      handleTogglePlayback,
      addToNextUp,
      song,
      artist,
      idx,
      updateMoreActions,
      moreActionsIdx
    } = this.props;

    const { title, imageUrl, audioUrl } = song;
    const timestamp = song.createdAt;

    let open;
    if (parseInt(moreActionsIdx) !== idx) {
      open = "";
    } else {
      open = "open";
    }

    return (
      <li className="song-index-item">
        <div>
          <div className="playable-tile">
            <div className="playable-tile-artwork" style={{"backgroundImage": `url(${imageUrl})`}}>
              <div className="play-button">
                <a className={`play-button-link ${paused}`} onClick={handleTogglePlayback} href="#">Play</a>
              </div>
              <div className="playable-tile-actions">
                <button onClick={this.redirectToLogin.bind(this)} className="bc-btn playable-like-btn">Like</button>
                <div onClick={updateMoreActions} className="bc-btn playable-more-btn">
                  <div className={`more-actions ${open}`}>
                    <button onClick={addToNextUp} className="more-actions-btn more-add-next-up-btn">Add to Next up</button>
                    <button onClick={this.redirectToLogin.bind(this)} className="more-actions-btn more-repost-btn">Repost</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="playable-tile-description">
              <div className="playable-tile-description-title">
                <a className="truncate">{title}</a>
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


const mapStateToProps = (state) => ({
  moreActionsIdx: state.ui.menus.playableTileIdx,
});

export default connect(mapStateToProps, null)(SongIndexItem);
