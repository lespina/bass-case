# == Schema Information
#
# Table name: songs
#
#  id                 :integer          not null, primary key
#  title              :string           not null
#  user_id            :integer          not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  audio_file_name    :string
#  audio_content_type :string
#  audio_file_size    :integer
#  audio_updated_at   :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  plays              :integer          default(0)
#

class Song < ApplicationRecord
  DEFAULT_IMAGE_URL = "track-artwork/default-track-image.png"

  validates :title, presence: true

  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :reposts, dependent: :destroy

  has_many :likers,
    through: :likes,
    source: :user

  has_many :reposters,
    through: :reposts,
    source: :user

  has_attached_file :image, styles: { medium: "500x500>" }, default_url: DEFAULT_IMAGE_URL
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_attached_file :audio
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\z/
end
