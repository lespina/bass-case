export const createRepost = (userId, songId) => {
  return $.ajax({
    url: `api/users/${userId}/reposts/`,
    method: 'post',
    data: {
      repost: {
        song_id: songId
      }
    }
  });
};

export const deleteRepost = (repostId) => {
  return $.ajax({
    url: `api/reposts/${repostId}`,
    method: 'delete',
  });
};
