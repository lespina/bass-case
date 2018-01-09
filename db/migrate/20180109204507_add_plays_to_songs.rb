class AddPlaysToSongs < ActiveRecord::Migration[5.1]
  def change
    add_column :songs, :plays, :integer, default: 0
  end
end
