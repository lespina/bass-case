# == Schema Information
#
# Table name: reposts
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  song_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Repost < ApplicationRecord
  validates :user_id, uniqueness: { scope: :song_id,
    message: "Users may only repost a track once" }

  belongs_to :user
  belongs_to :song
end
