class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      log_in_user(@user)
      render "api/users/session"
    else
      render json: ["Invalid username/password"], status: 401
    end
  end

  def destroy
    log_out_user
    render json: {}
  end

end
