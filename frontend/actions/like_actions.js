import * as LikeApiUtil from '../util/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const receiveLike = (like) => ({
  type: RECEIVE_LIKE,
  like
});

export const removeLike = (like) => ({
  type: REMOVE_LIKE,
  like
});

export const createLike = (userId, songId) => (dispatch) => {
  return LikeApiUtil.createLike(userId, songId).then(like => {
    dispatch(receiveLike(like));
    return like;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};

export const deleteLike = (likeId) => (dispatch) => {
  return LikeApiUtil.deleteLike(likeId).then(like => {
    dispatch(removeLike(like));
    return like;
  }, errors => {
    console.log(errors.responseJSON);
    return errors;
  });
};
