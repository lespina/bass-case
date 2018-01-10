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

  timeSortedActions() {
    const sortedActions = [];

    Object.keys(this.props.songActions).forEach((userId) => {
      this.props.songActions[userId].forEach((song) => {
        sortedActions.push([userId, song]);
      }, this);
    }, this);

    return sortedActions.sort((action1, action2) => {
      const song1 = action1[1];
      const song2 = action2[1];

      const time1 = new Date(song1.createdAt).getTime();
      const time2 = new Date(song2.createdAt).getTime();

      return time2 - time1;
    });
  }

  render() {
    if (Object.keys(this.props.songActions).length > 0) {
      return (
        <ul className="stream-index">
          {
            this.timeSortedActions().map((songAction, idx) => {
              const userId = songAction[0];
              const song = songAction[1];
              const artist = this.props.users[song.artistId];
              return (
                <StreamIndexItem
                  key={`${idx}`}
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
                  createRepost={this.props.createRepost}
                  deleteRepost={this.props.deleteRepost}
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
