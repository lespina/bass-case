import FollowToggle from './follow_toggle';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFollow, deleteFollow } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    sessionCurrentUser: state.session.currentUser,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFollow: (followeeId) => dispatch(createFollow(followeeId)),
    deleteFollow: (followeeId) => dispatch(deleteFollow(followeeId)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FollowToggle)
);
