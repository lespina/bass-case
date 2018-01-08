import _ from 'lodash';
import SortablePlayBarQueue from './sortable_play_bar_queue';
import { connect } from 'react-redux';
import { receiveNewPlaybackSongs, receivePlaybackSongFromQueue, togglePlayback, clearQueue, updateQueue } from '../../actions/playback_actions';

const mapStateToProps = (state) => {
  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];

  return {
    users: state.entities.users,
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
    updateQueue: (songQueue, songIdx) => dispatch(updateQueue(songQueue, songIdx)),
    receiveNewPlaybackSongs: (songs) => dispatch(receiveNewPlaybackSongs(songs)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortablePlayBarQueue);
