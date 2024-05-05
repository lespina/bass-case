import SessionForm from './session_form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, login, receiveSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  let formType;
  if (ownProps.location.pathname === '/login') {
    formType = 'login';
  } else {
    formType = 'signup';
  }

  return {
    errors: state.errors.session,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm =
    (ownProps.location.pathname === '/login') ?
    login :
    signup
  ;

  return {
    processForm: (user) => dispatch(processForm(user)),
    clearSessionErrors: () => dispatch(receiveSessionErrors([]))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SessionForm)
);
