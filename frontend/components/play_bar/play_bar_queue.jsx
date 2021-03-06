import React from 'react';
import { withRouter } from 'react-router-dom';
import { SortableContainer } from 'react-sortable-hoc';
import QueueItem from './queue_item';

class PlayBarQueue extends React.Component {
  constructor(props) {
    super(props);
    this.handleTogglePlayback = this.handleTogglePlayback.bind(this);
    this.updateMoreActions = this.updateMoreActions.bind(this);
  }

  redirectToLogin(e) {
    e.preventDefault();
    this.props.history.push('/login');
    return;
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
                        addToNextUp={addToNextUp}
                        currentUser={currentUserWithLikes}
                        redirectToLogin={this.redirectToLogin.bind(this)}
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
