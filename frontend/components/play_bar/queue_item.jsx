import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import LikeToggle from '../like_toggle/like_toggle_container';
import RepostToggle from '../repost_toggle/repost_toggle_container';

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
      addToNextUp,
      open,
      updateMoreActions,
      artist,
    } = this.props;

    let ourPausedClass = paused;
    if (song.id !== parseInt(currentSongId)) { ourPausedClass = ""; }
    const { title, imageUrl } = song;
    const activeReposts = ((currentUser && currentUser.reposts && song.id in currentUser.reposts) ? 'active' : '' );
    const repostText = ((currentUser && currentUser.reposts && song.id in currentUser.reposts) ? 'Reposted' : 'Repost' );
    return (
      <div className={`queue-item ${dimmed}`}>
        <div className={`queue-item-actions ${open}`}>
          <LikeToggle type="QUEUE_ITEM" song={song}/>
          <div onClick={updateMoreActions} className={`bc-btn playable-more-btn queue-more-btn ${open}`}>
            <div className={`more-actions queue-actions-menu ${open}`}>
              <LikeToggle type="QUEUE_ITEM_ACTION" song={song}/>
              <button onClick={addToNextUp.bind(null, song.id)} className="more-actions-btn more-add-next-up-btn">Add to Next up</button>
              <RepostToggle song={song} type="QUEUE_ITEM"/>
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
