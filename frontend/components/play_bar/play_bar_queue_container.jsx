import _ from 'lodash';
import PlayBarQueue from './play_bar_queue';
import { connect } from 'react-redux';
import { receivePlaybackSong, togglePlayback } from '../../actions/playback_actions';

const mapStateToProps = (state) => {
  const { songQueue, songIdx } = state.ui.playback;
  const currentSongId = songQueue[songIdx];

  return {
    songs: state.entities.songs,
    songQueue: state.ui.playback.songQueue,
    currentSongId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayback: () => dispatch(togglePlayback()),
    receivePlaybackSong: (songId) => dispatch(receivePlaybackSong(songId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayBarQueue);
