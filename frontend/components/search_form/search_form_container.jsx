import { connect } from 'react-redux';
import _ from 'lodash';
import SearchForm from './search_form';

const mapStateToProps = (state) => ({
  songs: _.values(state.entities.songs),
  users: _.values(state.entities.users)
});

// const mapDispatchToProps = (dispatch) => ({
//
// });

export default connect(
  mapStateToProps,
  null
)(SearchForm);
