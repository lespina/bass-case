import SessionForm from './session_form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.session,
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
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SessionForm)
);
