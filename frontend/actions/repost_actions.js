import * as RepostApiUtil from '../util/repost_api_util';

export const RECEIVE_REPOST = "RECEIVE_REPOST";
export const REMOVE_REPOST = "REMOVE_REPOST";

export const receiveRepost = (repost) => ({
  type: RECEIVE_REPOST,
  repost
});

export const removeRepost = (repost) => ({
  type: REMOVE_REPOST,
  repost
});

export const createRepost = (userId, songId) => (dispatch) => {
  return RepostApiUtil.createRepost(userId, songId).then(repost => {
    dispatch(receiveRepost(repost));
    return repost;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const deleteRepost = (repostId) => (dispatch) => {
  return RepostApiUtil.deleteRepost(repostId).then(repost => {
    dispatch(removeRepost(repost));
    return repost;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};
