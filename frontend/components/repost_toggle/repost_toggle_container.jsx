import RepostToggle from './repost_toggle';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRepost, deleteRepost } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    sessionCurrentUser: state.session.currentUser,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRepost: (songId) => dispatch(createRepost(songId)),
    deleteRepost: (songId) => dispatch(deleteRepost(songId)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RepostToggle)
);
