import _ from 'lodash';
import SongIndex from './song_index';
import { connect } from 'react-redux';
import { fetchSongs } from '../../actions/song_actions';

const mapStateToProps = (state) => {
  return {
    songs: _.values(state.entities.songs.display),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongIndex);
