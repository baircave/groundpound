class Api::TracksController < ApplicationController

  def index
    @tracks = Track.with_attached_artwork.with_attached_track_file.includes(:artist, :comments)
    render :index
  end

  def show
    @track = Track.includes(comments: [:author]).find(params[:id])
    if @track
      @user = User.find(@track.artist_id)
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

  def update
    @track = Track.find(params[:id])
    if track_params[:plays] #increment playcount if plays are in track params
      @track.plays += 1
      if @track.save
        render json: { trackId: params[:id] }
      else
        render json: @track.errors.full_messages
      end
    else
      if @track.update_attributes(track_params)
        render :show
      else
        render json: @track.errors.full_messages
      end
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
    params.require(:track).permit(:title, :description, :artwork, :track_url, :track_file, :plays)
  end

end
