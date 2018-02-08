class Api::UsersController < ApplicationController
  def index
    @users = User.includes(:songs, :followers, :followees).all
  end

  def show
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

    if @user.username == 'guest'
      render json: ['You do not have authority to edit the guest account.'], status: 401
      return
    end

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def like
    @like = current_user.likes.new(song_id: params[:song_id])
    if @like.save
      render :like
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def unlike
    @like = current_user.likes.find_by(song_id: params[:song_id])

    if @like
      @like.destroy
      render :like
    else
      render json: ['Like does not exist or you are not authorized to destroy it'], status: 401
    end
  end

  def follow
    @follow = current_user.follows.new(followee_id: params[:followee_id])
    if @follow.save
      render :follow
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def unfollow
    @follow = current_user.follows.find_by(followee_id: params[:followee_id])

    if @follow
      @follow.destroy
      render :follow
    else
      render json: ['Follow does not exist or you are not authorized to destroy it'], status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :bio, :location, :profile_image, :banner_image)
  end
end
