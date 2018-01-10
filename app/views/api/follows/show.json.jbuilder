json.key_format! camelize: :lower
json.extract! @follow, :id, :follower_id, :followee_id
