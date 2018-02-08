import _ from 'lodash';
import React from 'react';
import StreamIndex from '../stream/stream_index';

class Stream extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.sessionCurrentUser.id);
  }

  currentUser() {
    const { users, sessionCurrentUser } = this.props;
    if (sessionCurrentUser) return users[sessionCurrentUser.id];
    return null;
  }

  filterSongs() {
    const { songs, users } =  this.props;
    const currentUser = this.currentUser();
    const followedUsers = [currentUser];
    for (let userId in users) {
      if (currentUser.followeeIds.has(parseInt(userId))) {
        followedUsers.push(users[userId]);
      }
    }

    this.songActions = {[currentUser.id]: []};

    currentUser.followeeIds.forEach(followedUserId => {
      this.songActions[followedUserId] = [];
    }, this);

    followedUsers.forEach(followedUser => {
      const songIds = followedUser.songIds;
      _.values(songs).forEach((song) => {
        if (song.artistId === followedUser.id) {
          this.songActions[followedUser.id].push([song, song.createdAt]);
        }
        if (followedUser.repostedSongIds.has(song.id)) {
          const createdAt = followedUser.reposts[song.id];
          this.songActions[followedUser.id].push([song, createdAt]);
        }
      }, this);
    }, this);
  }

  render() {
    if (!this.currentUser()) { return null; }

    this.filterSongs();

    return (
      <main className="stream-main border-right-light">
        <div className="user-main-stream">
          <StreamIndex
            songActions={this.songActions}
            user={this.currentUser()}
            users={this.props.users}
            togglePlayback={this.props.togglePlayback}
            receivePlaybackSong={this.props.receivePlaybackSong}
            addToNextUp={this.props.addToNextUp}
            currentSongId={this.props.currentSongId}
            playing={this.props.playing}
            currentUser={this.currentUser()}
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
