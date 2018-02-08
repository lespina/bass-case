import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { togglePlayback, receivePlaybackSong, addToNextUp } from '../../actions/playback_actions';
import { fetchUser } from '../../actions/user_actions';
import Stream from './stream';

const mapStateToProps = (state, ownProps) => {
  const { songQueue, songIdx, playing } = state.ui.playback;
  const currentSongId = songQueue[songIdx];
  return {
    sessionCurrentUser: state.session.currentUser,
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
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Stream)
);
