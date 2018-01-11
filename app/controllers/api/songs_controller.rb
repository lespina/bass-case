require "rubygems"
require "mp3info"

class Api::SongsController < ApplicationController
  def index
    if (params[:songIds])
      @songs = Song.includes(:user, :likers).where(id: params[:songIds]).order(created_at: :desc)
      @associations = true
    else
      @songs = Song.includes(:user, :likers).all.order(created_at: :desc)
      @associations = false
    end
  end

  def create
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
