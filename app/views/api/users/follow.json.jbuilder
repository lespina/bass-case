json.key_format! camelize: :lower
json.extract! @follow, :follower_id, :followee_id
