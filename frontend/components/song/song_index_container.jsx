import _ from 'lodash';
import SongIndex from './song_index';
import { connect } from 'react-redux';
import { fetchSongs } from '../../actions/song_actions';
import { receivePlaybackSong, togglePlayback } from '../../actions/playback_actions';

const mapStateToProps = (state) => {
  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];

  return {
    songs: _.values(state.entities.songs),
    currentSongId,
    playing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    receivePlaybackSong: (songId) => dispatch(receivePlaybackSong(songId)),
    togglePlayback: () => dispatch(togglePlayback()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongIndex);
