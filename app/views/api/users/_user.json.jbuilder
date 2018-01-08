json.extract! user, :id, :username, :bio, :location
json.avatarUrl user.profile_image.url
json.bannerUrl user.banner_image.url
json.songIds user.song_ids
