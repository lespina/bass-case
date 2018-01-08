import _ from 'lodash';
import Playback from './playback';
import { connect } from 'react-redux';
import {
  receivePosition,
  receiveDuration,
  previous,
  togglePlayback,
  next,
  toggleShuffle,
  toggleLoop,
  seekTo,
  receiveVolume,
  fetchPlaybackSongs
} from '../../actions/playback_actions';
import { fetchSongs } from '../../actions/song_actions';

const mapStateToProps = (state) => {
  return {
    songs: state.entities.songs,
    playback: state.ui.playback,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    next: () => dispatch(next()),
    seekTo: (position) => dispatch(seekTo(position)),
    receivePosition: (duration) => dispatch(receivePosition(duration)),
    receiveDuration: (duration) => dispatch(receiveDuration(duration)),
    fetchSongs: () => dispatch(fetchSongs()),
    fetchPlaybackSongs: (songIds) => dispatch(fetchPlaybackSongs(songIds)),
    fetchPlaybackSong: (songId) => dispatch(fetchPlaybackSong(songId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playback);
