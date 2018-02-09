export const fetchUsers = (userIds) => {
  return $.ajax({
    url: `api/users`,
    method: 'get',
    data: {
      userIds
    }
  });
};

export const fetchUser = (userId) => {
  return $.ajax({
    url: `api/users/${userId}`,
    method: 'get',
  });
};

export const updateUser = (userId, formData) => {
  return $.ajax({
    url: `api/users/${userId}`,
    method: 'patch',
    contentType: false,
    processData: false,
    data: formData,
  });
};

export const createLike = (songId) => {
  return $.ajax({
    url: `api/users/likes/${songId}`,
    method: 'post',
  });
};

export const deleteLike = (songId) => {
  return $.ajax({
    url: `api/users/likes/${songId}`,
    method: 'delete',
  });
};

export const createFollow = (followeeId) => {
  return $.ajax({
    url: `api/users/follows/${followeeId}`,
    method: 'post',
  });
};

export const deleteFollow = (followeeId) => {
  return $.ajax({
    url: `api/users/follows/${followeeId}`,
    method: 'delete',
  });
};

export const createRepost = (songId) => {
  return $.ajax({
    url: `api/users/reposts/${songId}`,
    method: 'post',
  });
};

export const deleteRepost = (songId) => {
  return $.ajax({
    url: `api/users/reposts/${songId}`,
    method: 'delete',
  });
};
