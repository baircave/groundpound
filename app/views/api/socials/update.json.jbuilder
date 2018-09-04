json.tracks do
  json.partial! 'api/tracks/track', track: @track
end

profile_photo = nil
cover_photo_file = nil

profile_photo = url_for(@user.profile_photo) if @user.profile_photo.attached?
cover_photo_file = url_for(@user.cover_photo) if @user.cover_photo.attached?

followed_artists = @user.followed_artists.order('follows.created_at DESC')

json.users do
  json.set! @user.id do

    json.extract! @user, :username, :nickname, :id, :bio, :location
    json.track_ids @tracks_and_reposts
    json.reposted_ids @user.reposted_tracks.ids
    json.uploaded_ids @user.track_ids
    json.liked_ids @user.liked_tracks.order('likes.created_at DESC').ids
    json.followed_ids followed_artists.ids
    json.follower_count @user.followers.size
    json.profile_photo profile_photo
    json.cover_photo_file cover_photo_file
  end
end
