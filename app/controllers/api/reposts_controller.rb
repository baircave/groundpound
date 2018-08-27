class Api::RepostsController < ApplicationController

  def create
    repost = Repost.new({
      track_id: params[:track_id],
      user_id: current_user.id})
    if repost.save
      render json { reposted_ids: current_user.reposted_tracks.ids }
    else
      render json repost.errors.full_messages
    end
  end

  def destroy
    repost = Repost.find_by({
      track_id: params[:track_id],
      user_id: current_user.id})
    repost.destroy
    render json { reposted_ids: current_user.reposted_tracks.ids }
  end

end
