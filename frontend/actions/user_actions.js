import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const fetchUsers = () => (dispatch) => {
  return UserApiUtil.fetchUsers().then(users => {
    dispatch(receiveUsers(users));
    return users;
  });
};

export const fetchUser = (userId) => (dispatch) => {
  return UserApiUtil.fetchUser(userId).then(user => {
    dispatch(receiveUser(user));
    return(user);
  });
};

export const updateUser = (userId, formData) => (dispatch) => {
  return UserApiUtil.updateUser(userId, formData).then(user => {
    dispatch(receiveUser(user));
    return(user);
  });
};
