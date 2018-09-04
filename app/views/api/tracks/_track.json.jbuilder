artwork_file = nil
artwork_file = url_for(track.artwork) if track.artwork.attached?

json.set! track.id do
  json.comment_count track.comments.size
  json.like_count track.likes.size
  json.repost_count track.reposts.size
  json.extract! track, :title, :id, :track_url, :artist_id, :created_at, :plays
  json.artwork_file artwork_file
  json.track_file url_for(track.track_file)
end
