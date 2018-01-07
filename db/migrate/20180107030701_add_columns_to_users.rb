class AddColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :location, :string
    add_column :users, :bio, :string
    add_attachment :users, :profile_image
    add_attachment :users, :banner_image
  end
end
