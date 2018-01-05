import React from 'react';
import QueueItem from './queue_item';

class PlayBarQueue extends React.Component {
  constructor(props) {
    super(props);
    this.handleTogglePlayback = this.handleTogglePlayback.bind(this);
  }

  handleTogglePlayback(songId) {
    return (e) => {
      e.preventDefault();
      if (this.props.currentSongId != songId) {
        this.props.receivePlaybackSong(songId);
      } else {
        this.props.togglePlayback();
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
    const { clearQueue, hideQueue, handleTogglePlayback, songs, playing, songIdx } = this.props;
    const paused = ((playing) ? "paused" : "");

    return (
      <section className="playbar-queue-body">
        <div className="queue">
          <section className="queue-panel">
            <div className="queue-title">Next up</div>
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
                      return <QueueItem
                        key={idx}
                        song={song}
                        dimmed={dimmed}
                        handleTogglePlayback={this.handleTogglePlayback(idx)}
                        paused={paused}
                        currentSongId={this.currentSongId()}
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

export default PlayBarQueue;
