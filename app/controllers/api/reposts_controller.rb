class Api::RepostsController < ApplicationController

  def create
    repost = Repost.new({
      track_id: params[:track_id],
      user_id: current_user.id})
    if repost.save
      tracks_and_reposts = current_user.get_tracks_and_reposts.column_values(0);
      render json {
        user_id: current_user.id,
        reposted_ids: current_user.reposted_tracks.ids
        track_ids: tracks_and_reposts
      }
    else
      render json repost.errors.full_messages
    end
  end

  def destroy
    repost = Repost.find_by({
      track_id: params[:track_id],
      user_id: current_user.id})
    repost.destroy
    render json {
      user_id: current_user.id,
      reposted_ids: current_user.reposted_tracks.ids
      track_ids: tracks_and_reposts
    }
  end

end
