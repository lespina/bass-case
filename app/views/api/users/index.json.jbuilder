@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username
    json.songIds user.song_ids
    json.numFollowers user.followers.length
    json.avatarUrl user.profile_image.url(:medium)
  end
end
