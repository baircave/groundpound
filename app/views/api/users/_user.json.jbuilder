profile_photo = nil
cover_photo_file = nil

profile_photo = url_for(user.profile_photo) if user.profile_photo.attached?
cover_photo_file = url_for(user.cover_photo) if user.cover_photo.attached?

json.userId user.id

json.users do
  json.set! user.id do
    json.extract! user, :username, :nickname, :id, :bio, :location
    json.track_ids user.track_ids
    json.reposted_ids user.reposted_tracks.ids
    json.liked_ids user.liked_tracks.limit(3).ids
    json.followed_ids user.followed_artists.limit(5).ids
    json.follower_count user.followers.length
    json.follows_count user.followed_artists.length
    json.profile_photo profile_photo
    json.cover_photo_file cover_photo_file
  end
end

if user.tracks.empty? && user.reposted_tracks.empty? && user.liked_tracks.empty?
  json.tracks ({})
else
  json.tracks do
    user.tracks.each do |track|
      artwork_file = nil
      artwork_file = url_for(track.artwork) if track.artwork.attached?
      json.set! track.id do
        json.comment_count track.comments.size
        json.extract! track, :id, :title, :track_url, :created_at, :artist_id, :plays
        json.artwork_file artwork_file
        json.track_file url_for(track.track_file)
      end
    end

    user.reposted_tracks.each do |track|
      artwork_file = nil
      artwork_file = url_for(track.artwork) if track.artwork.attached?
      json.set! track.id do
        json.comment_count track.comments.size
        json.extract! track, :id, :title, :track_url, :created_at, :artist_id, :plays
        json.artwork_file artwork_file
        json.track_file url_for(track.track_file)
      end
    end

    user.liked_tracks.each do |track|
      artwork_file = nil
      artwork_file = url_for(track.artwork) if track.artwork.attached?
      json.set! track.id do
        json.comment_count track.comments.size
        json.extract! track, :id, :title, :track_url, :created_at, :artist_id, :plays
        json.artwork_file artwork_file
        json.track_file url_for(track.track_file)
      end
    end
  end
end
