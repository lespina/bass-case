import React from 'react';
import { Link } from 'react-router-dom';
import * as TimeFormatUtil from '../../util/time_format_util';

class StreamIndexItem extends React.Component {
  constructor(props) {
    super(props);
    const { createLike, deleteLike, currentUser, song } = this.props;
    const likes = currentUser.likes;
    this.state = {
      liked: (song.id in currentUser.likes),
      change: 0,
    };

    this.handleToggleLike = this.handleToggleLike.bind(this);
  }

  modifyChange(wasLiked) {
    if (wasLiked) {
      return -1;
    } else {
      return 1;
    }
  }

  handleToggleLike(e) {
    e.preventDefault();
    const { currentUser, song, deleteLike, createLike } = this.props;
    if (song.id in currentUser.likes) {
      deleteLike(currentUser.likes[song.id]);
    } else {
      createLike(currentUser.id, song.id);
    }

    this.setState({
      liked: !this.state.liked,
      change: this.state.change + this.modifyChange(this.state.liked),
    });

  }

  render() {
    const {
      song,
      artist,
      handleTogglePlayback,
      playing,
      currentSongId,
      addToNextUp,
      currentUser,
    } = this.props;

    const active = ((song.id in currentUser.likes) ? 'active' : '' );
    const paused = ((playing && parseInt(currentSongId) === song.id) ? 'stream-paused' : '');
    const coverImage = { backgroundImage: `url(${song.imageUrl})` };

    return (
      <li className="stream-index-item">
        <div className="stream-index-item-body">
          <div className="stream-index-item-artwork">
            <a href="#" className="stream-index-item-cover-art">
              <div className="stream-index-item-cover-art-bg">
                <span className="stream-index-item-cover-art-true-image" style={coverImage}>Sound Cover Image</span>
              </div>
            </a>
          </div>
          <div className="stream-index-item-content">
            <div className="stream-index-item-header">
              <div className="sound-title-container">
                <div onClick={handleTogglePlayback} className={`bc-btn sound-title-play-btn ${paused}`}></div>
                <div className="sound-title-info-container">
                  <div className="sound-title-info-first">
                    <Link to={`/users/${artist.id}`} className="sound-title-username1">{artist.username}</Link>
                    {/* <a href="#" className="sound-title-username2">&nbsp;&nbsp;Statik</a> */}
                  </div>
                  <a href="#" className="sound-title-info-second">{song.title}</a>
                  <div className="sound-title-info-third">
                    <div className="sound-title-info-upload-time">{TimeFormatUtil.timeSince(song.createdAt)}</div>
                    <a className="tag-container tag-small">
                      <span className="truncate sound-title-info-tag">Electronic</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="sound-waveform">
              <div className="waveform loaded">

              </div>
            </div>

            <div className="sound-footer">
              <div className="sound-actions">
                <button onClick={this.handleToggleLike} type="button" className={`bc-btn sound-actions-btn action-like ${active}`}>{song.numLikes + this.state.change}</button>
                <button type="button" className="bc-btn sound-actions-btn action-repost ">65</button>
                <button onClick={addToNextUp.bind(null, song.id)} type="button" className="bc-btn sound-actions-btn action-next-up">Add to Next up</button>
              </div>
              <div className="sound-stats">
                <div className="sound-stats-plays">15.4K</div>
                <div className="sound-stats-comments">1</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default StreamIndexItem;
