import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";
export const RECEIVE_REPOST = "RECEIVE_REPOST";
export const REMOVE_REPOST = "REMOVE_REPOST";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const receiveUserErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const receiveLike = (payload) => ({
  type: RECEIVE_LIKE,
  userId: payload.userId,
  songId: payload.songId
});

export const removeLike = (payload) => ({
  type: REMOVE_LIKE,
  userId: payload.userId,
  songId: payload.songId
});

export const receiveFollow = (payload) => ({
  type: RECEIVE_FOLLOW,
  followerId: payload.followerId,
  followeeId: payload.followeeId
});

export const removeFollow = (payload) => ({
  type: REMOVE_FOLLOW,
  followerId: payload.followerId,
  followeeId: payload.followeeId
});

export const receiveRepost = (payload) => ({
  type: RECEIVE_REPOST,
  userId: payload.userId,
  songId: payload.songId,
  createdAt: payload.createdAt,
});

export const removeRepost = (payload) => ({
  type: REMOVE_REPOST,
  userId: payload.userId,
  songId: payload.songId,
  createdAt: payload.createdAt,
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
  }, errors => {
    dispatch(receiveUserErrors(errors.responseJSON));
    return errors;
  });
};

export const createLike = (songId) => (dispatch) => {
  return UserApiUtil.createLike(songId).then(payload => {
    dispatch(receiveLike(payload));
    return payload;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const deleteLike = (songId) => (dispatch) => {
  return UserApiUtil.deleteLike(songId).then(payload => {
    dispatch(removeLike(payload));
    return payload;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const createFollow = (followeeId) => (dispatch) => {
  return UserApiUtil.createFollow(followeeId).then(payload => {
    dispatch(receiveFollow(payload));
    return payload;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const deleteFollow = (followeeId) => (dispatch) => {
  return UserApiUtil.deleteFollow(followeeId).then(payload => {
    dispatch(removeFollow(payload));
    return payload;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const createRepost = (songId) => (dispatch) => {
  return UserApiUtil.createRepost(songId).then(payload => {
    dispatch(receiveRepost(payload));
    return payload;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const deleteRepost = (songId) => (dispatch) => {
  return UserApiUtil.deleteRepost(songId).then(payload => {
    dispatch(removeRepost(payload));
    return payload;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};
