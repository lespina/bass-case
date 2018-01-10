class CreateReposts < ActiveRecord::Migration[5.1]
  def change
    create_table :reposts do |t|
      t.integer :user_id
      t.integer :song_id
      t.timestamps
    end

    add_index :reposts, [:user_id, :song_id], unique: true
    add_index :reposts, :song_id
  end
end
