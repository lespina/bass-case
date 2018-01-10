import React from 'react';
import { withRouter } from 'react-router-dom';
import { SortableContainer } from 'react-sortable-hoc';
import QueueItem from './queue_item';

class PlayBarQueue extends React.Component {
  constructor(props) {
    super(props);
    this.handleTogglePlayback = this.handleTogglePlayback.bind(this);
    this.handleToggleLike = this.handleToggleLike.bind(this);
    this.handleToggleRepost = this.handleToggleRepost.bind(this);
    this.updateMoreActions = this.updateMoreActions.bind(this);
  }

  handleTogglePlayback(songIdx) {
    return (e) => {
      e.preventDefault();
      if (this.props.songIdx != songIdx) {
        this.props.receivePlaybackSong(songIdx);
      } else {
        this.props.togglePlayback();
      }
    };
  }

  handleToggleRepost(song) {
    return (e) => {
      e.preventDefault();
      const { currentUser, deleteRepost, createRepost, users } = this.props;
      if (!currentUser) {
        this.props.history.push('/login');
        return;
      }

      const repostingUser = users[currentUser.id];
      if (song.id in repostingUser.reposts) {
        deleteRepost(repostingUser.reposts[song.id]);
      } else {
        createRepost(repostingUser.id, song.id);
      }
    };
  }

  handleToggleLike(song) {
    return (e) => {
      e.preventDefault();

      const { currentUser, deleteLike, createLike, users } = this.props;
      if (!currentUser) {
        this.props.history.push('/login');
        return;
      }
      const likingUser = users[currentUser.id];
      if (song.id in likingUser.likes) {
        deleteLike(likingUser.likes[song.id]);
      } else {
        createLike(likingUser.id, song.id);
      }
    };
  }

  updateMoreActions(idx) {
    return (e) => {
      e.preventDefault();
      if (parseInt(this.props.moreActionsIdx) === idx) {
        this.props.receiveMoreActionsIndex(null);
      } else {
        this.props.receiveMoreActionsIndex(idx);
      }
    };
  }

  orderedSongs() {
    return this.props.songQueue.map(songId => {
      return this.props.songs[songId];
    });
  }

  currentSongId() {
    const { songQueue, songIdx } = this.props;
    return songQueue[songIdx];
  }

  render() {
    const {
      clearQueue,
      hideQueue,
      handleTogglePlayback,
      receiveNewPlaybackSongs,
      addToNextUp,
      moreActionsIdx,
      songs,
      playing,
      songIdx,
      users,
      currentUser
    } = this.props;

    let currentUserWithLikes;
    if (currentUser) {
      currentUserWithLikes = users[currentUser.id];
    } else {
      currentUserWithLikes = null;
    }

    const paused = ((playing) ? "paused" : "");

    return (
      <section className="playbar-queue-body">
        <div className="queue">
          <section className="queue-panel">
            <div className="queue-title">Next up</div>
            <button onClick={receiveNewPlaybackSongs} type="button" className="bc-btn queue-clear">Refresh</button>
            <button onClick={clearQueue} type="button" className="bc-btn queue-clear">Clear</button>
            <button onClick={hideQueue} type="button" className="bc-btn queue-hide">Hide queue</button>
          </section>

          <section className="queue-scrollable">
            <div className="queue-inner-scrollable">
              <div className="queue-inner-height">
                <div className="queue-items-wrapper">
                  {
                    this.orderedSongs().map((song, idx) => {
                      const dimmed = ((idx === this.props.songIdx) ? "" : "dimmed");
                      const artist = users[song.artistId];

                      let open;
                      if (parseInt(moreActionsIdx) !== idx) {
                        open = "";
                      } else {
                        open = "open";
                      }

                      return <QueueItem
                        key={idx}
                        index={idx}
                        artist={artist}
                        song={song}
                        dimmed={dimmed}
                        handleTogglePlayback={this.handleTogglePlayback(idx)}
                        updateMoreActions={this.updateMoreActions(idx)}
                        open={open}
                        paused={paused}
                        currentSongId={this.currentSongId()}
                        handleToggleLike={this.handleToggleLike(song)}
                        handleToggleRepost={this.handleToggleRepost(song)}
                        addToNextUp={addToNextUp}
                        currentUser={currentUserWithLikes}
                      />;
                    }, this)
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default SortableContainer(withRouter(PlayBarQueue));
