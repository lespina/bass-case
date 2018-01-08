json.extract! user, :id, :username, :bio, :location
json.avatarUrl user.profile_image.url(:medium)
json.bannerUrl user.banner_image.url(:large)
json.songIds user.song_ids
