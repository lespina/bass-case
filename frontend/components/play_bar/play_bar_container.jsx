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
  toggleMute,
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
    previous: () => dispatch(previous()),
    togglePlayback: () => dispatch(togglePlayback()),
    next: () => dispatch(next()),
    toggleShuffle: () => dispatch(toggleShuffle()),
    toggleLoop: () => dispatch(toggleLoop()),
    seekTo: (position) => dispatch(seekTo(position)),
    toggleMute: () => dispatch(toggleMute()),
    receiveVolume: (volume) => dispatch(receiveVolume(volume)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayBar);
