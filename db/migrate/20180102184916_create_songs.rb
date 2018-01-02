class CreateSongs < ActiveRecord::Migration[5.1]
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.integer :user_id, null: false
    end

    add_index :songs, :user_id

    add_attachment :songs, :image
    add_attachment :songs, :audio
  end
end
