import * as SongApiUtil from '../util/song_api_util';

export const PREVIOUS = "PREVIOUS";
export const TOGGLE_PLAYBACK = "TOGGLE_PLAYBACK";
export const NEXT = "NEXT";

export const SEEK = "SEEK";

export const RECEIVE_VOLUME = "RECEIVE_VOLUME";

export const previous = () => ({
  type: PREVIOUS
});

export const togglePlayback = () => ({
  type: TOGGLE_PLAYBACK
});

export const next = () => ({
  type: NEXT
});

export const seek = (position) => ({
  type: SEEK,
  position,
});

export const receiveVolume = (volume) => ({
  type: RECEIVE_VOLUME,
  volume,
});
