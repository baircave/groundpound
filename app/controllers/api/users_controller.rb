class Api::UsersController < ApplicationController

  def show
    @user = User.includes(
      :likes,
      :followed_artists,
      :followers,
      liked_tracks: [:likes, :reposts, artwork_attachment: :blob],
      reposted_tracks: [:likes, :reposts, artwork_attachment: :blob],
      tracks: [:likes, :reposts, :comments],
      comments: [:track]).find(params[:id])
    @tracks_and_reposts = @user.get_tracks_and_reposts.column_values(0);

    if @user
      render :show
    else
      render json: ["No user found with that id"], status: 404
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in_user(@user)
      render "api/users/session"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    if current_user
      User.delete(current_user.id)
      render json: ["DESTROYEEEDDDDDD"]
    else
      render json: ["Can't delete users when not logged in"]
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :location, :nickname, :profile_url, :bio, :profile_photo, :cover_photo)
  end

end
