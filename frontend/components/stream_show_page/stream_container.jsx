import React from 'react';
import { connect } from 'react-redux';
import Stream from './stream';
import { fetchUser } from '../../actions/user_actions';


const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  users: state.entities.users
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
