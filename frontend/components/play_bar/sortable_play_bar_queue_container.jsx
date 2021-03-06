import _ from 'lodash';
import SortablePlayBarQueue from './sortable_play_bar_queue';
import { connect } from 'react-redux';
import {
  receiveNewPlaybackSongs,
  receivePlaybackSongFromQueue,
  togglePlayback,
  clearQueue,
  updateQueue,
  addToNextUp
} from '../../actions/playback_actions';
import { receiveMoreActionsIndex } from '../../actions/menu_actions';

const mapStateToProps = (state) => {
  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];

  return {
    users: state.entities.users,
    songs: state.entities.songs,
    currentUser: state.session.currentUser,
    songQueue: state.ui.playback.songQueue,
    moreActionsIdx: state.ui.menus.queueIdx,
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
    receiveMoreActionsIndex: (idx) => dispatch(receiveMoreActionsIndex('queueIdx', idx)),
    addToNextUp: (songId) => dispatch(addToNextUp(songId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortablePlayBarQueue);
