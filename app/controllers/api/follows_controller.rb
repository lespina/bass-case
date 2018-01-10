class Api::FollowsController < ApplicationController
  def create
    if params[:user_id] != current_user.id.to_s
      render json: ['You are not authorized to create this follow'], status: 401
      return
    end
    @follow = current_user.follows.new(follow_params)

    if @follow.save
      render :show
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroy
    @follow = current_user.follows.find_by(id: params[:id])
    if @follow
      @follow.destroy
      render :show
    else
      render json: ['Follow does not exist or you are not authorized to destroy it'], status: 401
    end
  end

  private
  def follow_params
    params.require(:follow).permit(:followee_id)
  end
end
