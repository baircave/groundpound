artwork = nil
artwork = url_for(@track.artwork) if @track.artwork.attached?
audio = url_for(@track.track_file)

json.track do
  json.extract! @track, :title, :description, :track_url, :artist_id, :id, :created_at, :plays
  json.comment_ids @track.comments.order('created_at DESC').ids
  json.comment_count @track.comments.size
  json.like_count @track.likes.size
  json.repost_count @track.reposts.size
  json.artwork_file artwork
  json.track_file audio
end

json.users do
  json.set! @track.artist_id do
    profile_photo = nil
    profile_photo = url_for(@user.profile_photo) if @user.profile_photo.attached?

    artist = @track.artist
    json.extract! artist, :username, :nickname, :profile_url, :id
    json.follower_count artist.followers.size
    json.profile_photo profile_photo
  end

  @track.comments.each do |comment|
    json.set! comment.author.id do
      author = comment.author
      profile_photo = nil
      profile_photo = url_for(author.profile_photo) if author.profile_photo.attached?
      json.extract! comment.author, :id, :username
      json.profile_photo profile_photo
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
