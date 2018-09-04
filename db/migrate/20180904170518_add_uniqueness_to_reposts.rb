class AddUniquenessToReposts < ActiveRecord::Migration[5.2]
  def change
    add_index :reposts, [:user_id, :track_id], unique: true
  end
end
