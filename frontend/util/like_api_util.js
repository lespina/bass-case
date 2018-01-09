export const createLike = (userId, songId) => {
  return $.ajax({
    url: `api/users/${userId}/likes/`,
    method: 'post',
    data: {
      like: {
        song_id: songId
      }
    }
  });
};

export const deleteLike = (likeId) => {
  return $.ajax({
    url: `api/likes/${likeId}`,
    method: 'delete',
  });
};
