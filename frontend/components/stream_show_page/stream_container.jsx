import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { togglePlayback, receivePlaybackSong, addToNextUp } from '../../actions/playback_actions';
import { createLike, deleteLike } from '../../actions/like_actions';
import { createRepost, deleteRepost } from '../../actions/repost_actions';
import { fetchUser } from '../../actions/user_actions';
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
  createRepost: (userId, songId) => dispatch(createRepost(userId, songId)),
  deleteRepost: (repostId) => dispatch(deleteRepost(repostId)),
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Stream)
);
