@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username, :bio, :location
    json.songIds user.song_ids
    json.followerIds user.follower_ids
    json.followeeIds user.followee_ids
    json.repostedSongIds user.reposted_song_ids
    json.reposts do
      user.reposts.each do |repost|
        json.set! repost.song_id, repost.created_at
      end
    end
    json.avatarUrl asset_path(user.profile_image.url(:medium))
  end
end
