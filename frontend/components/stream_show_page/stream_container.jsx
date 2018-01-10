import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { togglePlayback, receivePlaybackSong, addToNextUp } from '../../actions/playback_actions';
import { createLike, deleteLike } from '../../actions/like_actions';
import Stream from './stream';

const mapStateToProps = (state, ownProps) => {
  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];
  return {
    currentUser: state.entities.users[state.session.currentUser.id],
    songs: state.entities.songs,
    users: state.entities.users,
    currentSongId,
    playing,
  };
};

const mapDispatchToProps = (dispatch) => ({
  togglePlayback: () => dispatch(togglePlayback()),
  receivePlaybackSong: (songId) => dispatch(receivePlaybackSong(songId)),
  addToNextUp: (songId) => dispatch(addToNextUp(songId)),
  createLike: (userId, songId) => dispatch(createLike(userId, songId)),
  deleteLike: (likeId) => dispatch(deleteLike(likeId)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Stream)
);
