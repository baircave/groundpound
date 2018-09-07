class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      log_in_user(@user)
      @tracks_and_reposts = @user.get_tracks_and_reposts.column_values(0)
      render "api/users/show"
    else
      render json: ["Invalid username/password"], status: 401
    end
  end

  def destroy
    log_out_user
    render json: {}
  end

end
