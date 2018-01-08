import React from 'react';
import StreamIndexItem from './stream_index_item';

class StreamIndex extends React.Component {

  handleTogglePlayback(songId) {
    return (e) => {
      e.preventDefault();
      if (this.props.currentSongId != songId) {
        this.props.receivePlaybackSong(songId);
      } else {
        this.props.togglePlayback();
      }
      this.forceUpdate();
    };
  }

  render() {
    if (this.props.songs.length > 0) {
      return (
        <ul className="stream-index">
          {
            this.props.songs.map((song, idx) => {
              const artist = this.props.users[song.artistId];
              return (
                <StreamIndexItem
                  key={idx}
                  song={song}
                  artist={artist}
                  handleTogglePlayback={this.handleTogglePlayback.bind(this)(song.id)}
                  currentSongId={this.props.currentSongId}
                  playing={this.props.playing}
                  receivePlaybackSong={this.props.receivePlaybackSong}
                  addToNextUp={this.props.addToNextUp}
                />
              );
            }, this)
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default StreamIndex;
