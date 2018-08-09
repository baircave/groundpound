json.tracks do
  @tracks.each do |track|
    artwork_file = nil
    artwork_file = url_for(track.artwork) if track.artwork.attached?
    json.set! track.id do
      json.extract! track, :title, :id, :track_url, :artist_id, :created_at
      json.artwork_file artwork_file
      json.track_file url_for(track.track_file)
    end
  end
end

json.users do
  @tracks.each do |track|
    json.set! track.artist_id do
      json.extract! track.artist, :username, :id
    end
  end
end
