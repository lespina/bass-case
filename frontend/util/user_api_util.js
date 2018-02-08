export const fetchUsers = () => {
  return $.ajax({
    url: `api/users`,
    method: 'get',
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
