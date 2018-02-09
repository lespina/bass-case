if @all_info
  json.users do
    @users.each do |user|
      json.set! user.id do
        json.partial! 'api/users/user', user: user
      end
    end
  end
  json.doNotReplace true
else
  json.users do
    @users.each do |user|
      json.set! user.id do
        json.extract! user, :id, :username, :location
        json.avatarUrl asset_path(user.profile_image.url(:medium))
      end
    end
  end
  json.doNotReplace false
end
