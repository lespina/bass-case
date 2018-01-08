class Api::LikesController < ApplicationController
  def create
    @like = Like.new(user_params)
    if @like.save
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = current_user.likes.find_by(id: params[:id])
    if @like
      @like.destroy
      render :show
    else
      render json: ['Like does not exist or you are not authorized to destroy it'], status: 401
    end
  end

  private
  def like_params
    params.require(:like).permit(:user_id, :song_id)
  end
end
