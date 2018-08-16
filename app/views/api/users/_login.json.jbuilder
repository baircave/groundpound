profile_photo = nil
profile_photo = url_for(user.profile_photo) if user.profile_photo.attached?

json.extract! user, :username, :nickname, :id
json.profile_photo profile_photo
