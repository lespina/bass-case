import _ from 'lodash';
import PlayBar from './play_bar';
import { connect } from 'react-redux';
import {
  receiveDuration,
  previous,
  togglePlayback,
  next,
  toggleShuffle,
  toggleLoop,
  seekTo,
  receiveVolume,
  fetchPlaybackSongs,
  fetchPlaybackSong
} from '../../actions/playback_actions';

const mapStateToProps = (state) => {
  return {
    songs: state.entities.songs,
    playback: state.ui.playback,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    seekTo: (position) => dispatch(seekTo(position)),
    receiveDuration: (duration) => dispatch(receiveDuration(duration)),
    fetchPlaybackSongs: (songIds) => dispatch(fetchPlaybackSongs(songIds)),
    fetchPlaybackSong: (songId) => dispatch(fetchPlaybackSong(songId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayBar);
