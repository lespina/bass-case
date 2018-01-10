json.id song.id
json.artistId song.user_id
json.title song.title
json.imageUrl song.image.url
json.audioUrl song.audio.url
json.createdAt song.created_at
json.numLikes song.likes.length
json.numReposts song.reposts.length
json.reposterIds song.reposter_ids

if song.reposts.length > 0
  json.reposts do
    song.reposts.each do |repost|
      json.set! repost.user_id, repost.created_at
    end
  end
else
  json.reposts ({})
end

json.plays song.plays

# if associations
json.likerIds song.liker_ids
# end
