import React from 'react';
import { Link } from 'react-router-dom';

class StreamIndexItem extends React.Component {

  render() {
    const { song, artist } = this.props;
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
                <div className="bc-btn sound-title-play-btn"></div>
                <div className="sound-title-info-container">
                  <div className="sound-title-info-first">
                    <Link to={`/users/${artist.id}`} className="sound-title-username1">{artist.username}</Link>
                    {/* <a href="#" className="sound-title-username2">&nbsp;&nbsp;Statik</a> */}
                  </div>
                  <a href="#" className="sound-title-info-second">{song.title}</a>
                  <div className="sound-title-info-third">
                    <div className="sound-title-info-upload-time">1 month</div>
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
                <button type="button" className="bc-btn sound-actions-btn action-like active">433</button>
                <button type="button" className="bc-btn sound-actions-btn action-repost ">65</button>
                <button type="button" className="bc-btn sound-actions-btn action-next-up">Add to Next up</button>
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
