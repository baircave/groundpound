class Api::TracksController < ApplicationController

  def index
    @tracks = Track.all.includes(:artist)
    render :index
  end

  def show
    @track = Track.includes(comments: [:author]).find(params[:id])
    render :show
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

  private
  def track_params
    params.require(:track).permit(:title, :description, :artwork, :track_url, :track_file)
  end

end
