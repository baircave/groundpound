class CreateReposts < ActiveRecord::Migration[5.2]
  def change
    create_table :reposts do |t|
      t.integer :track_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
