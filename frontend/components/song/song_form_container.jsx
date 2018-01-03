import SongForm from './song_form';
import { connect } from 'react-redux';
import { createSong } from '../../actions/song_actions';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch) => {
  return {
    createSong: (song) => dispatch(createSong(song)),
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SongForm)
);
