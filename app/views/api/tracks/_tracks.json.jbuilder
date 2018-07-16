tracks.each do |track|
  json.set! track.id do
    json.extract! track, :title, :id
    json.username track.artist.username
  end
end
