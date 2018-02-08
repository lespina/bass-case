import LikeToggle from './like_toggle';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createLike, deleteLike } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    sessionCurrentUser: state.session.currentUser,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createLike: (songId) => dispatch(createLike(songId)),
    deleteLike: (songId) => dispatch(deleteLike(songId)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LikeToggle)
);
