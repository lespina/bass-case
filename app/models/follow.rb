# == Schema Information
#
# Table name: follows
#
#  id          :integer          not null, primary key
#  follower_id :integer          not null
#  followee_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Follow < ApplicationRecord
  validates :follower_id, uniqueness: { scope: :followee_id,
    message: "Users may only follow another user once" }

  belongs_to :followee,
    class_name: :User,
    foreign_key: :followee_id

  belongs_to :follower,
    class_name: :User,
    foreign_key: :follower_id
end
