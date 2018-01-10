json.extract! user, :id, :username, :bio, :location
json.avatarUrl user.profile_image.url(:medium)
json.bannerUrl user.banner_image.url(:large)
json.songIds user.song_ids

if user.likes.length > 0
  json.likes do
    user.likes.each do |like|
      json.set! like.song_id, like.id
    end
  end
else
  json.likes({})
end

# if user.been_followeds.length > 0
#   json.follows do
#     user.been_followeds.each do |follow|
#       json.set! follow.follower_id, follow.id
#     end
#   end
# else
#   json.follows({})
# end

if user.follows.length > 0
  json.follows do
    user.follows.each do |follow|
      json.set! follow.followee_id, follow.id
    end
  end
else
  json.follows({})
end
