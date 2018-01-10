class Api::RepostsController < ApplicationController
  def create
    if params[:user_id] != current_user.id.to_s
      render json: ['You are not authorized to create this repost'], status: 401
      return
    end

    @repost = current_user.reposts.new(repost_params)

    if @repost.save
      render :show
    else
      render json: @repost.errors.full_messages, status: 422
    end
  end

  def destroy
    @repost = current_user.reposts.find_by(id: params[:id])

    if @repost
      @repost.destroy
      render :show
    else
      render json: ['Repost does not exist or you are not authorized to destroy it'], status: 401
    end
  end

  private
  def repost_params
    params.require(:repost).permit(:song_id)
  end
end
