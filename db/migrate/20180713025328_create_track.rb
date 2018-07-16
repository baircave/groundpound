class CreateTrack < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :track_url, null: false
      t.integer :artist_id, null: false
      t.text :description
      t.string :download_url
      t.string :title, null: false

      t.timestamps
    end
  end
end
