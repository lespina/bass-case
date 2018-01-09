if @all_info
  json.partial! 'api/users/user', user: @user
else
  json.extract! @user, :id, :username
end
