class Api::TracksController < ApplicationController

  def index
    @tracks = Track.all.includes(:artist)
    render :index
  end

  def show
    @track = Track.includes(comments: [:author]).find(params[:id])
    if @track
      render :show
    else
      render json: ["No track found with that id"], status: 404
    end
  end

  def create
    @track = Track.new(track_params);
    @track.artist_id = current_user.id;
    if @track.save
      render :show
    else
      render json: @track.errors.full_messages
    end
  end

  def destroy
    track = Track.find(params[:id])
    artist_id = track.artist_id
    track.destroy
    render json: { trackId: params[:id], userId: artist_id }
  end

  private
  def track_params
    params.require(:track).permit(:title, :description, :artwork, :track_url, :track_file)
  end

end
