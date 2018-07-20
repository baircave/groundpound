json.tracks do
  @tracks.each do |track|
    json.set! track.id do
      json.extract! track, :title, :id, :track_url, :artist_id
      if (track.artwork.attached?)
        json.artwork_file url_for(track.artwork)
      end
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
