class AddWaveform < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :waveform, :text
  end
end
