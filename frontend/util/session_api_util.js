export const login = (user) => {
  return $.ajax({
    url: 'api/session',
    method: 'post',
    data: user,
  });
};

export const signup = (user) => {
  return $.ajax({
    url: 'api/users',
    method: 'post',
    data: user,
  });
};

export const logout = () => {
  return $.ajax({
    url: 'api/session',
    method: 'delete',
  });
};

export const fetchCurrentUser = (currentUserId) => {
  return $.ajax({
    url: `api/users/${currentUserId}`,
    method: 'get',
  });
};
