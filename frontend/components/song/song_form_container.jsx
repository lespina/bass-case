import SongForm from './song_form';
import { connect } from 'react-redux';
import { createSong, receiveSongErrors } from '../../actions/song_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.songs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSong: (song) => dispatch(createSong(song)),
    clearSongErrors: () => dispatch(receiveSongErrors([], true))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SongForm)
);
