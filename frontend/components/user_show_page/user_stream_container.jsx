import { connect } from 'react-redux';
import _ from 'lodash';
import { togglePlayback, receivePlaybackSong, addToNextUp } from '../../actions/playback_actions';
import UserStream from './user_stream';

const mapStateToProps = (state, ownProps) => {

  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];

  return {
    currentUser: state.entities.users[state.session.currentUser.id],
    songs: state.entities.songs,
    users: state.entities.users,
    currentSongId,
    playing: state.ui.playback.playing,
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
