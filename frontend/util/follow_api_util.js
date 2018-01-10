export const createFollow = (followerId, followeeId) => {
  return $.ajax({
    url: `api/users/${followerId}/follows/`,
    method: 'post',
    data: {
      follow: {
        followee_id: followeeId
      }
    }
  });
};

export const deleteFollow = (followId) => {
  return $.ajax({
    url: `api/follows/${followId}`,
    method: 'delete',
  });
};
