import * as LikeApiUtil from '../util/like_actions';

export const createLike = (like) => (dispatch) => {
  return LikeApiUtil.createLike(like).then(like => {
    dispatch(receiveLike(like));
    return like;
  });
};

export const deleteLike = (likeId) => (dispatch) => {
  return LikeApiUtil.deleteLike(likeId).then(like => {
    dispatch(removeLike(like.id));
    return like;
  });
};
