json.key_format! camelize: :lower
json.extract! @repost, :user_id, :song_id, :created_at
