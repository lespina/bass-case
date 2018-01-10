import React from 'react';
import { connect } from 'react-redux';
import StreamShow from './stream_show';
import { fetchUser } from '../../actions/user_actions';


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamShow);
