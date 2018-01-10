import * as FollowApiUtil from '../util/follow_api_util';

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

export const receiveFollow = (follow) => ({
  type: RECEIVE_FOLLOW,
  follow
});

export const removeFollow = (follow) => ({
  type: REMOVE_FOLLOW,
  follow
});

export const createFollow = (followerId, followeeId) => (dispatch) => {
  return FollowApiUtil.createFollow(followerId, followeeId).then(follow => {
    dispatch(receiveFollow(follow));
    return follow;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const deleteFollow = (followId) => (dispatch) => {
  return FollowApiUtil.deleteFollow(followId).then(follow => {
    dispatch(removeFollow(follow));
    return follow;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};
