import _ from 'lodash';
import SongIndex from './song_index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSongs } from '../../actions/song_actions';
import { receivePlaybackSong, togglePlayback, addToNextUp } from '../../actions/playback_actions';
import { receiveMoreActionsIndex } from '../../actions/menu_actions';

const mapStateToProps = (state) => {
  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];

  return {
    users: state.entities.users,
    songs: _.values(state.entities.songs),
    currentSongId,
    moreActionsIdx: state.ui.menus.playableTileIdx,
    playing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    receivePlaybackSong: (songId) => dispatch(receivePlaybackSong(songId)),
    togglePlayback: () => dispatch(togglePlayback()),
    receiveMoreActionsIndex: (moreActionsIdx) => dispatch(receiveMoreActionsIndex('playableTileIdx', moreActionsIdx)),
    addToNextUp: (songId) => dispatch(addToNextUp(songId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SongIndex)
);
