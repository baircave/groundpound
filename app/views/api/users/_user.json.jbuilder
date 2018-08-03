# profile_photo_file = url_for(user.profile_photo)
# cover_photo_file = url_for(user.cover_photo)

json.users do
  json.set! user.id do
    json.extract! user, :username, :nickname, :id, :bio, :location
    json.track_ids user.tracks.order('created_at ASC').ids
    # json.profile_photo_file profile_photo_file
    # json.cover_photo_file cover_photo_file
  end
end

if user.tracks.empty?
  json.tracks ({})
else
  json.tracks do
    user.tracks.each do |track|
      json.set! track.id do
        json.extract! track, :id, :title, :track_url, :created_at, :artist_id
        json.artwork_file url_for(track.artwork)
        json.track_file url_for(track.track_file)
      end
    end
  end
end
