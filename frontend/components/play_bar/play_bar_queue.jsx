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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     nextProps.songQueue.join('') === this.props.songQueue.join('') &&
  //     nextProps.currentSongId === this.props.currentSongId
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  orderedSongs() {
    return this.props.songQueue.map(songId => {
      return this.props.songs[songId];
    });
  }

  render() {
    const { handleTogglePlayback, songs } = this.props;

    return (
      <section className="playbar-queue-body">
        <div className="queue">
          <section className="queue-panel">
            <div className="queue-title">Next up</div>
            <button type="button" className="bc-btn queue-clear">Clear</button>
            <button type="button" className="bc-btn queue-hide">Hide queue</button>
          </section>

          <section className="queue-scrollable">
            <div className="queue-inner-scrollable">
              <div className="queue-inner-height">
                <div className="queue-items-wrapper">
                  {
                    this.orderedSongs().map((song, idx) => {
                      const dimmed = ((idx === 0) ? "" : "dimmed");
                      return <QueueItem
                        key={song.id}
                        song={song}
                        dimmed={dimmed}
                        handleTogglePlayback={this.handleTogglePlayback(song.id)}
                      />;
                    })
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
