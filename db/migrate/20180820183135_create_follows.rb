class CreateFollows < ActiveRecord::Migration[5.2]
  def change
    create_table :follows do |t|
      t.integer :artist_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
