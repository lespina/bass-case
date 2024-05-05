require "rubygems"
require "mp3info"

class Api::SongsController < ApplicationController
  @@PER_USER_UPLOAD_LIMIT = 5

  def index
    # if (params[:songIds])
    #   @songs = Song.includes(:user, :likers).where(id: params[:songIds]).order(created_at: :desc)
    #   @associations = true
    # else
      @songs = Song.includes(:user, :likes, reposts: [:user]).all.order(created_at: :desc)
      @associations = false
    # end
  end

  def over_upload_limit?
    current_user.songs.length >= @@PER_USER_UPLOAD_LIMIT
  end

  def create
    if over_upload_limit?
      render json: { params[:formIdx] => ["User has exceeded their upload limit"] }, status: 422
      return
    end

    @song = current_user.songs.new(song_params)
    if @song.save
      render :show
    else
      render json: { params[:formIdx] => @song.errors.full_messages }, status: 422
    end
  end

  def update
    @song = Song.find(params[:id])
    if @song.update(song_params)
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.find(params[:id])
  end

  private
  def song_params
    params.require(:song).permit(:title, :image, :audio, :plays)
  end
end
