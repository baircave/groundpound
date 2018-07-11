class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in_user(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if current_user && current_user.id == params[:id] #only allow edit if logged in user is editing their own profile
      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render json: ["Can't edit another user's profile"], status: 401
    end
  end

  def destroy
    if current_user
      User.delete(current_user.id)
      render json: ["DESTROYEEEDDDDDD"]
    else
      render json: ["Can't delete users when not logged in"]
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :location, :nickname, :profile_url, :bio)
  end

end
