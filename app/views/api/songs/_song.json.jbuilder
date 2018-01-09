json.id song.id
json.artistId song.user_id
json.title song.title
json.imageUrl song.image.url
json.audioUrl song.audio.url
json.createdAt song.created_at
json.numLikes song.likers.length
json.plays song.plays

if associations
  json.likerIds song.liker_ids
end
