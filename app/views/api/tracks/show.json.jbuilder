artwork = url_for(@track.artwork)
audio = url_for(@track.track_file)

json.tracks do
  json.set! @track.id do
    json.extract! @track, :title, :description, :track_url, :artist_id, :id, :created_at
    json.commentIds @track.comments.order('created_at DESC').ids
    json.artwork_file artwork
    json.track_file audio
  end
end

json.users do
  json.set! @track.artist_id do
    json.extract! @track.artist, :username, :nickname, :profile_url, :id
  end
end

track_comments = @track.comments
json.comments do
  track_comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :created_at, :author_id, :track_id, :parent_comment_id
    end
  end
end
