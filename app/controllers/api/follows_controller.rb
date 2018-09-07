class Api::FollowsController < ApplicationController

  def create
    follow = Follow.new({
      artist_id: params[:artist_id],
      user_id: current_user.id})
    if follow.save
      render json: {
        user_id: current_user.id,
        followed_ids: current_user.followed_artists.ids
      }
    else
      render json: follow.errors.full_messages
    end
  end

  def destroy
    follow = Follow.find_by({
      artist_id: params[:artist_id],
      user_id: current_user.id})
    follow.destroy
    render json: {
      user_id: current_user.id,
      followed_ids: current_user.followed_artists.ids
    }
  end

end
