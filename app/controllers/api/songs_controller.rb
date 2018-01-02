class Api::SongsController < ApplicationController
  def index
    @songs = Song.includes(:user).all.order(created_at: :desc)
  end

  def create
    @song = current_user.songs.create(song_params)
    render :show
  end

  def show
    @song = Song.find(params[:id])
  end

  private
  def song_params
    params.require(:song).permit(:title, :image, :audio)
  end
end
