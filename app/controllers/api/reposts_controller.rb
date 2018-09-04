class Api::RepostsController < ApplicationController

  def create
    repost = Repost.new({
      track_id: params[:track_id],
      user_id: current_user.id})
    if repost.save
      @track = Track.find(params[:track_id])
      @user = User.find(current_user.id)
      @tracks_and_reposts = current_user.get_tracks_and_reposts.column_values(0);
      render "api/socials/update"
    else
      render json: repost.errors.full_messages
    end
  end

  def destroy
    repost = Repost.find_by({
      track_id: params[:track_id],
      user_id: current_user.id})
    repost.destroy
    @track = Track.find(params[:track_id])
    @user = User.find(current_user.id)
    @tracks_and_reposts = current_user.get_tracks_and_reposts.column_values(0);
    render "api/socials/update"
  end

end
