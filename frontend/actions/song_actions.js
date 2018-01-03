import * as SongApiUtil from '../util/song_api_util';

export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_SONG = "RECEIVE_SONG";

export const receiveSongs = (songs) => ({
  type: RECEIVE_SONGS,
  songs
});

export const receiveSong = (song) => ({
  type: RECEIVE_SONG,
  song
});

export const fetchSongs = () => (dispatch) => {
  return SongApiUtil.fetchsongs().then(songs => {
    dispatch(receiveSongs(songs));
    return songs;
  });
};

export const fetchSong = () => (dispatch) => {
  return SongApiUtil.fetchsong().then(song => {
    dispatch(receiveSong(song));
    return song;
  });
};
