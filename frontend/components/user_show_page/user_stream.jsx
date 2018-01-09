import React from 'react';
import StreamIndex from '../stream/stream_index';

class UserStream extends React.Component {
  render() {
    return (
      <main className="user-main border-right-light">
        <div className="user-main-stream">
          <StreamIndex
            songs={this.props.songs}
            users={this.props.users}
            togglePlayback={this.props.togglePlayback}
            receivePlaybackSong={this.props.receivePlaybackSong}
            addToNextUp={this.props.addToNextUp}
            currentSongId={this.props.currentSongId}
            playing={this.props.playing}
            currentUser={this.props.currentUser}
            createLike={this.props.createLike}
            deleteLike={this.props.deleteLike}
            fetchCurrentUser={this.props.fetchCurrentUser}
          />
          <div className="user-main-stream-loading"></div>
        </div>
      </main>
    );
  }
}

export default UserStream;
