import * as SessionApiUtil from '../util/session_api_util';
import * as UserApiUtil from '../util/user_api_util';

import { receiveUser } from './user_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const TOGGLE_ON_ROOT_PAGE = 'TOGGLE_ON_ROOT_PAGE';

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const toggleOnRootPage = () => ({
  type: TOGGLE_ON_ROOT_PAGE,
});

export const login = (user) => (dispatch) => {
  return SessionApiUtil.login(user).then(response => {
    dispatch(receiveCurrentUser(response));
    UserApiUtil.fetchUser(response.id).then(userResponse => {
      dispatch(receiveUser(userResponse));
      return(userResponse);
    });
    return response;
  }, errors => {
    dispatch(receiveSessionErrors(errors.responseJSON));
    return errors;
  });
};

export const signup = (user) => (dispatch) => {
  return SessionApiUtil.signup(user).then(response => {
    dispatch(receiveCurrentUser(response));
    UserApiUtil.fetchUser(response.id).then(userResponse => {
      dispatch(receiveUser(userResponse));
      return(userResponse);
    });
    return response;
  }, errors => {
    dispatch(receiveSessionErrors(errors.responseJSON));
    return errors;
  });
};

export const logout = () => (dispatch) => {
  return SessionApiUtil.logout().then(response => {
    dispatch(toggleOnRootPage());
    dispatch(receiveCurrentUser(null));
    dispatch(toggleOnRootPage());
    return response;
  }, errors => {
    dispatch(receiveSessionErrors(errors.responseJSON));
    return errors;
  });
};
