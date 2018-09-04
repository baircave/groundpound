class Api::LikesController < ApplicationController

  def create
    like = Like.new({
      track_id: params[:track_id],
      user_id: current_user.id})
    if like.save
      @track = Track.find(params[:track_id])
      @user = User.find(current_user.id)
      @tracks_and_reposts = @user.get_tracks_and_reposts.column_values(0)
      render "api/socials/update"
    else
      render json: like.errors.full_messages
    end
  end

  def destroy
    like = Like.find_by({
      track_id: params[:track_id],
      user_id: current_user.id})
    like.destroy
    @track = Track.find(params[:track_id])
    @user = User.find(current_user.id)
    @tracks_and_reposts = @user.get_tracks_and_reposts.column_values(0)
    render "api/socials/update"
  end

end
