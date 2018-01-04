import * as SongApiUtil from '../util/song_api_util';

export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_SONG = "RECEIVE_SONG";
export const RECEIVE_SONG_ERRORS = "RECEIVE_SONG_ERRORS";

export const receiveSongs = (songs) => ({
  type: RECEIVE_SONGS,
  songs
});

export const receiveSong = (song) => ({
  type: RECEIVE_SONG,
  song
});

export const receiveSongErrors = (errors) => ({
  type: RECEIVE_SONG_ERRORS,
  errors
});

export const fetchSongs = () => (dispatch) => {
  return SongApiUtil.fetchSongs().then(songs => {
    dispatch(receiveSongs(songs));
    return songs;
  });
};

export const fetchSong = () => (dispatch) => {
  return SongApiUtil.fetchSong().then(song => {
    dispatch(receiveSong(song));
    return song;
  });
};

export const createSong = (song) => (dispatch) => {
  return SongApiUtil.createSong(song).then(song => {
    dispatch(receiveSong(song));
    return song;
  }, errors => {
    dispatch(receiveSongErrors(errors.responseJSON));
    return errors;
  });
};
