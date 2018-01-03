import SongForm from './song_form';
import { connect } from 'react-redux';
import { createSong } from '../../actions/song_actions';

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.session.currentUser
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    createSong: (song) => dispatch(createSong(song)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SongForm);
