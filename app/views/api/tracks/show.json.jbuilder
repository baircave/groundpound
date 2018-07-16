artwork = url_for(@track.artwork)
audio = url_for(@track.track_file)

json.tracks do
  json.set! @track.id do
    json.extract! @track, :title, :description, :track_url, :artist_id, :id
    json.artwork_file artwork
    json.track_file audio
  end
end

json.users do
  json.set! @track.artist_id do
    json.extract! @track.artist, :username, :nickname, :profile_url, :id
  end
end
