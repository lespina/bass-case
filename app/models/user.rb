# == Schema Information
#
# Table name: users
#
#  id                         :integer          not null, primary key
#  username                   :string           not null
#  password_digest            :string           not null
#  session_token              :string           not null
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  location                   :string
#  bio                        :string
#  profile_image_file_name    :string
#  profile_image_content_type :string
#  profile_image_file_size    :integer
#  profile_image_updated_at   :datetime
#  banner_image_file_name     :string
#  banner_image_content_type  :string
#  banner_image_file_size     :integer
#  banner_image_updated_at    :datetime
#

class User < ApplicationRecord
  DEFAULT_PROFILE_IMAGE_URL = "track-artwork/default-track-image.png"

  has_attached_file :profile_image, styles: { medium: "500x500>" }, default_url: DEFAULT_PROFILE_IMAGE_URL
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\z/

  has_attached_file :banner_image, styles: { large: "1240x260#" }, default_url: ""
  validates_attachment_content_type :banner_image, content_type: /\Aimage\/.*\z/

  validates :bio, length: { maximum: 140, allow_nil: true }

  validates :username, :session_token, :password_digest, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :songs, dependent: :destroy
  has_many :likes
  has_many :reposts

  has_many :liked_songs,
    through: :likes,
    source: :song

  has_many :reposted_songs,
    through: :reposts,
    source: :song

  has_many :follows,
    class_name: :Follow,
    foreign_key: :follower_id

  has_many :been_followeds,
    class_name: :Follow,
    foreign_key: :followee_id

  # has_many :followers,
  #   class_name: :User,
  #   foreign_key: :follower_id

  has_many :followees,
    through: :follows,
    source: :followee

  has_many :followers,
    through: :been_followeds,
    source: :follower

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
