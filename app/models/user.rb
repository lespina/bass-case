# == Schema Information
#
# Table name: users
#
#  id                         :integer          not null, primary key
#  username                   :string           not null
#  password_digest            :string           not null
#  session_token              :string           not null
#  location                   :string
#  bio                        :string
#  profile_image              :attachment
#  banner_image               :attachment
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#

class User < ApplicationRecord
  DEFAULT_PROFILE_IMAGE_URL = "https://s3.amazonaws.com/basscase-dev/default-track-image.png"


  has_attached_file :profile_image, styles: { medium: "500x500>" }, default_url: DEFAULT_PROFILE_IMAGE_URL
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\z/

  has_attached_file :banner_image, styles: { large: "#1240x260" }, defrault_url: ""
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\z/

  validates :bio, length: { maximum: 140, allow_nil: true }

  validates :username, :session_token, :password_digest, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :songs

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
