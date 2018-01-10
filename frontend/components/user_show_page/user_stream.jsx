import React from 'react';
import StreamIndex from '../stream/stream_index';

class UserStream extends React.Component {
  filterSongs() {
    const { songs, user } =  this.props;

    const songIds = user.songIds;
    if (songIds) {
      this.songs = _.values(songs).filter(song => {
        return (song.artistId === user.id);
      });
    } else {
      this.songs = [];
    }
  }

  render() {
    this.filterSongs();

    return (
      <main className="user-main border-right-light">
        <div className="user-main-stream">
          <StreamIndex
            songs={this.songs}
            users={this.props.users}
            togglePlayback={this.props.togglePlayback}
            receivePlaybackSong={this.props.receivePlaybackSong}
            addToNextUp={this.props.addToNextUp}
            currentSongId={this.props.currentSongId}
            playing={this.props.playing}
            currentUser={this.props.currentUser}
            createLike={this.props.createLike}
            deleteLike={this.props.deleteLike}
          />
          <div className="user-main-stream-loading"></div>
        </div>
      </main>
    );
  }
}

export default UserStream;
