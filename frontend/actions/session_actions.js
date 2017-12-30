import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const login = (user) => (dispatch) => {
  return SessionApiUtil.login(user).then(response => {
    dispatch(receiveCurrentUser(response));
    return response;
  }, errors => {
    dispatch(receiveSessionErrors(errors.responseJSON));
    return errors;
  });
};

export const signup = (user) => (dispatch) => {
  return SessionApiUtil.signup(user).then(response => {
    dispatch(receiveCurrentUser(response));
    return response;
  }, errors => {
    dispatch(receiveSessionErrors(errors.responseJSON));
    return errors;
  });
};

export const logout = () => (dispatch) => {
  return SessionApiUtil.logout().then(response => {
    dispatch(receiveCurrentUser(null));
    return response;
  }, errors => {
    dispatch(receiveSessionErrors(errors.responseJSON));
    return errors;
  });
};
