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

if user.reposts.length > 0
  json.reposts do
    user.reposts.each do |repost|
      json.set! repost.song_id, repost.id
    end
  end
else
  json.reposts({})
end

if user.follows.length > 0
  json.follows do
    user.follows.each do |follow|
      json.set! follow.followee_id, follow.id
    end
  end
else
  json.follows({})
end
