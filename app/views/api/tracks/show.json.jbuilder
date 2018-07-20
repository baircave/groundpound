artwork = url_for(@track.artwork)
audio = url_for(@track.track_file)

json.track do
  json.extract! @track, :title, :description, :track_url, :artist_id, :id, :created_at
  json.comment_ids @track.comments.order('created_at DESC').ids
  json.artwork_file artwork
  json.track_file audio
end

json.users do
  json.set! @track.artist_id do
    json.extract! @track.artist, :username, :nickname, :profile_url, :id
  end
  @track.comments.each do |comment|
    json.set! comment.author.id do
      json.extract! comment.author, :id, :username
    end
  end
end


json.comments do
  @track.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :created_at, :author_id, :track_id, :parent_comment_id
    end
  end
end
