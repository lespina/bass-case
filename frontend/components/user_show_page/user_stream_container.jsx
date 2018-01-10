import { connect } from 'react-redux';
import _ from 'lodash';
import { togglePlayback, receivePlaybackSong, addToNextUp } from '../../actions/playback_actions';
import { createLike, deleteLike } from '../../actions/like_actions';
import UserStream from './user_stream';

const mapStateToProps = (state, ownProps) => {
  const allSongs = state.entities.songs;
  const songIds = ownProps.user.songIds;

  // debugger

  let songs;
  if (songIds) {
    songs = _.values(allSongs).filter(song => {
      return songIds.includes(song.id);
    });
  } else {
    songs = [];
  }

  // let myFolloweeSongs;
  // if ()

  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];
  return {
    currentUser: state.entities.users[state.session.currentUser.id],
    songs,
    users: state.entities.users,
    currentSongId,
    playing: state.ui.playback.playing,
  };
};

const mapDispatchToProps = (dispatch) => ({
  togglePlayback: () => dispatch(togglePlayback()),
  receivePlaybackSong: (songId) => dispatch(receivePlaybackSong(songId)),
  addToNextUp: (songId) => dispatch(addToNextUp(songId)),
  createLike: (userId, songId) => dispatch(createLike(userId, songId)),
  deleteLike: (likeId) => dispatch(deleteLike(likeId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserStream);
