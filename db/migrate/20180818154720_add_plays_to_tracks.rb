class AddPlaysToTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :plays, :integer, null: false, default: 0
  end
end
