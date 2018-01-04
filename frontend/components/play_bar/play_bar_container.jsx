import _ from 'lodash';
import PlayBar from './play_bar';
import { connect } from 'react-redux';
import {
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
  const { display, playback } = state.entities.songs;
  const songs = _.merge(display, playback);

  return {
    songs,
    playback: state.ui.playback,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    previous: () => dispatch(previous()),
    togglePlayback: () => dispatch(togglePlayback()),
    next: () => dispatch(next()),
    toggleShuffle: () => dispatch(toggleShuffle()),
    toggleLoop: () => dispatch(toggleLoop()),
    seekTo: (position) => dispatch(seekTo(position)),
    receiveVolume: (volume) => dispatch(receiveVolume(volume)),
    fetchPlaybackSongs: (songIds) => dispatch(fetchPlaybackSongs(songIds)),
    fetchPlaybackSong: (songId) => dispatch(fetchPlaybackSong(songId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayBar);
