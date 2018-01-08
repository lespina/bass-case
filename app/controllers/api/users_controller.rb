class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @all_info = true
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      @all_info = true
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :bio, :location, :profile_image, :banner_image)
  end
end
