if @new_session
  json.extract! @user, :id, :username
else
  json.partial! 'api/users/user', user: @user
end
