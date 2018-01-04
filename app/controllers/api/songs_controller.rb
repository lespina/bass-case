require "rubygems"
require "mp3info"

class Api::SongsController < ApplicationController
  def index
    if (params[:songIds])
      @songs = Song.includes(:user).where(id: params[:songIds])
    else
      @songs = Song.includes(:user).all.order(created_at: :desc)
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

  def show
    @song = Song.find(params[:id])
  end

  private
  def song_params
    params.require(:song).permit(:title, :image, :audio)
  end
end
