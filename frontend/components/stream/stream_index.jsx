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
    if (Object.keys(this.props.songActions).length > 0) {
      return (
        <ul className="stream-index">
          {
            Object.keys(this.props.songActions).map((userId, idx1) => {
              return this.props.songActions[userId].map((song, idx2) => {
                const artist = this.props.users[song.artistId];
                return (
                  <StreamIndexItem
                    key={`${idx1}${idx2}`}
                    user={this.props.users[userId]}
                    song={song}
                    artist={artist}
                    handleTogglePlayback={this.handleTogglePlayback.bind(this)(song.id)}
                    currentSongId={this.props.currentSongId}
                    playing={this.props.playing}
                    receivePlaybackSong={this.props.receivePlaybackSong}
                    addToNextUp={this.props.addToNextUp}
                    currentUser={this.props.currentUser}
                    createLike={this.props.createLike}
                    deleteLike={this.props.deleteLike}
                  />
                );
              }, this);
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
