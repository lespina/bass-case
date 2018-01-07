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

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
