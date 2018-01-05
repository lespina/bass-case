import _ from 'lodash';
import PlayBarQueue from './play_bar_queue';
import { connect } from 'react-redux';
import { receivePlaybackSongFromQueue, togglePlayback, clearQueue } from '../../actions/playback_actions';

const mapStateToProps = (state) => {
  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];

  return {
    songs: state.entities.songs,
    songQueue: state.ui.playback.songQueue,
    currentSongId,
    playing,
    songIdx,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayback: () => dispatch(togglePlayback()),
    receivePlaybackSong: (songIdx) => dispatch(receivePlaybackSongFromQueue(songIdx)),
    clearQueue: () => dispatch(clearQueue()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayBarQueue);
