import React from 'react';
import _ from 'lodash';
import StreamIndex from '../stream/stream_index';

class UserStream extends React.Component {
  filterSongs() {
    const { songs, user } =  this.props;
    const songIds = user.songIds;



    this.songActions = { [user.id]: [] };
    if (songIds) {
      _.values(songs).forEach((song) => {
        if (song.artistId === user.id || song.reposterIds.includes(user.id)) {
          this.songActions[user.id].push(song);
        }
      }, this);
    } else {
      this.songActions = {};
    }
  }

  render() {
    this.filterSongs();
    debugger
    return (
      <main className="user-main border-right-light">
        <div className="user-main-stream">
          <StreamIndex
            songActions={this.songActions}
            users={this.props.users}
            togglePlayback={this.props.togglePlayback}
            receivePlaybackSong={this.props.receivePlaybackSong}
            addToNextUp={this.props.addToNextUp}
            currentSongId={this.props.currentSongId}
            playing={this.props.playing}
            currentUser={this.props.currentUser}
            createLike={this.props.createLike}
            deleteLike={this.props.deleteLike}
            createRepost={this.props.createRepost}
            deleteRepost={this.props.deleteRepost}
          />
          <div className="user-main-stream-loading"></div>
        </div>
      </main>
    );
  }
}

export default UserStream;
