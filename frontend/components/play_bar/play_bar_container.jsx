import _ from 'lodash';
import PlayBar from './play_bar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
// import { createLike, deleteLike } from '../../actions/like_actions';

const mapStateToProps = (state) => {
  return {
    users: state.entities.users,
    songs: state.entities.songs,
    currentUser: state.session.currentUser,
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
    // createLike: (userId, songId) => dispatch(createLike(userId, songId)),
    // deleteLike: (likeId) => dispatch(deleteLike(likeId)),
  };
};

export default withRouter(
    connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayBar)
);
