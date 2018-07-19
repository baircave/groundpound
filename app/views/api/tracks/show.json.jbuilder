artwork = url_for(@track.artwork)
audio = url_for(@track.track_file)

track_comments = @track.comments.includes(:author)
comment_authors = []
track_comments.each { |comment| comment_authors << comment.author }

json.tracks do
  json.set! @track.id do
    json.extract! @track, :title, :description, :track_url, :artist_id, :id, :created_at
    json.comment_ids @track.comments.order('created_at DESC').ids
    json.artwork_file artwork
    json.track_file audio
  end
end

json.users do
  json.set! @track.artist_id do
    json.extract! @track.artist, :username, :nickname, :profile_url, :id
  end
  comment_authors.each do |author|
    json.set! author.id do
      json.extract! author, :id, :username
    end
  end
end


json.comments do
  track_comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :created_at, :author_id, :track_id, :parent_comment_id
    end
  end
end
