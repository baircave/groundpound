class Api::LikesController < ApplicationController

  def create
    like = Repost.new({
      track_id: params[:track_id],
      user_id: current_user.id})
    if like.save
      render json { liked_ids: current_user.liked_tracks.ids }
    else
      render json like.errors.full_messages
    end
  end

  def destroy
    like = Repost.find_by({
      track_id: params[:track_id],
      user_id: current_user.id})
    like.destroy
    render json { liked_ids: current_user.liked_tracks.ids }
  end

end
