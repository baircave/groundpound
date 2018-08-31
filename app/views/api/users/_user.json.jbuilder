profile_photo = nil
cover_photo_file = nil

profile_photo = url_for(user.profile_photo) if user.profile_photo.attached?
cover_photo_file = url_for(user.cover_photo) if user.cover_photo.attached?

json.userId user.id

followed_artists = user.followed_artists.order('follows.created_at DESC')

json.users do
  json.set! user.id do

    json.extract! user, :username, :nickname, :id, :bio, :location
    json.track_ids tracks_and_reposts
    json.reposted_ids user.reposted_tracks.ids
    json.uploaded_ids user.track_ids
    json.liked_ids user.liked_tracks.order('likes.created_at DESC').ids
    json.followed_ids followed_artists.ids
    json.follower_count user.followers.size
    json.profile_photo profile_photo
    json.cover_photo_file cover_photo_file
  end

  user.reposted_tracks.each do |track|
    json.set! track.artist_id do
      json.extract! track.artist, :username, :id
    end
  end

  followed_artists.each do |artist|
    profile_photo = nil
    profile_photo = url_for(artist.profile_photo) if artist.profile_photo.attached?

    json.set! artist.id do
      json.extract! artist, :username, :id
      json.profile_photo profile_photo
      json.follower_count artist.followers.size
      json.track_count artist.tracks.size
    end
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
        json.like_count track.likes.size
        json.repost_count track.reposts.size
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
        json.like_count track.likes.size
        json.repost_count track.reposts.size
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
        json.like_count track.likes.size
        json.repost_count track.reposts.size
        json.extract! track, :id, :title, :track_url, :created_at, :artist_id, :plays
        json.artwork_file artwork_file
        json.track_file url_for(track.track_file)
      end
    end
  end
end
