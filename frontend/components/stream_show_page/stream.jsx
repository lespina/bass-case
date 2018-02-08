import React from 'react';
import StreamIndex from '../stream/stream_index';

class Stream extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  filterSongs() {
    const { songs, users, currentUser } =  this.props;
    const followedUsers = [];
    for (let userId in users) {
      if (currentUser.followeeIds.has(parseInt(userId))) {
        followedUsers.push(users[userId]);
      }
    }

    this.songActions = {};
    
    currentUser.followeeIds.forEach(followedUserId => {
      this.songActions[followedUserId] = [];
    }, this);

    followedUsers.forEach(followedUser => {
      const songIds = followedUser.songIds;

      _.values(songs).forEach((song) => {
        if (song.artistId === followedUser.id) {
          this.songActions[followedUser.id].push([song, song.createdAt]);
        } else if (followedUser.id in song.reposts) {
          this.songActions[followedUser.id].push([song, song.reposts[followedUser.id]]);
        }
      }, this);
    }, this);
  }

  render() {
    if (this.props.currentUser.followeeIds.size === 0) { return null; }

    this.filterSongs();

    return (
      <main className="stream-main border-right-light">
        <div className="user-main-stream">
          <StreamIndex
            songActions={this.songActions}
            user={this.props.currentUser}
            users={this.props.users}
            togglePlayback={this.props.togglePlayback}
            receivePlaybackSong={this.props.receivePlaybackSong}
            addToNextUp={this.props.addToNextUp}
            currentSongId={this.props.currentSongId}
            playing={this.props.playing}
            currentUser={this.props.currentUser}
            createRepost={this.props.createRepost}
            deleteRepost={this.props.deleteRepost}
          />
          {/* <div className="user-main-stream-loading"></div> */}
        </div>
      </main>
    );
  }
}

export default Stream;
