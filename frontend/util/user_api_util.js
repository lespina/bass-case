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
