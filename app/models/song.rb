# == Schema Information
#
# Table name: songs
#
#  id                 :integer          not null, primary key
#  title              :string           not null
#  user_id            :integer          not null
#  image              :attachment
#  audio              :attachment
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#


class Song < ApplicationRecord
  DEFAULT_IMAGE_URL = "https://s3.amazonaws.com/basscase-dev/default-track-image.png"

  validates :title, presence: true

  belongs_to :user

  has_attached_file :image, styles: { medium: "500x500>" }, default_url: DEFAULT_IMAGE_URL
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_attached_file :audio
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\z/
end
