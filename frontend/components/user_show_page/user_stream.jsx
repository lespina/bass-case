import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import StreamIndex from '../stream/stream_index';
import { togglePlayback, receivePlaybackSong, addToNextUp } from '../../actions/playback_actions';

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
          />
          <div className="user-main-stream-loading"></div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const allSongs = state.entities.songs;
  const songIds = ownProps.user.songIds;
  let songs;
  if (songIds) {
    songs = _.values(allSongs).filter(song => {
      return songIds.includes(song.id);
    });
  } else {
    songs = [];
  }

  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];

  return {
    songs,
    users: state.entities.users,
    currentSongId,
    playing: state.ui.playback.playing
  };
};

const mapDispatchToProps = (dispatch) => ({
  togglePlayback: () => dispatch(togglePlayback()),
  receivePlaybackSong: (songId) => dispatch(receivePlaybackSong(songId)),
  addToNextUp: (songId) => dispatch(addToNextUp(songId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserStream);
