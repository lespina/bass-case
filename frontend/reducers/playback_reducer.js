import _ from 'lodash';
import shuffle from 'shuffle-array';

import {
  PREVIOUS,
  TOGGLE_PLAYBACK,
  NEXT,
  TOGGLE_SHUFFLE,
  TOGGLE_LOOP,
  SEEK,
  RECEIVE_VOLUME,
  RECEIVE_PLAYBACK_SONGS,
  RECEIVE_PLAYBACK_SONG
} from '../actions/playback_actions';

const LOOP_ONE = "LOOP_ONE";
const LOOP_ALL = "LOOP_ALL";

const initialState = {
  unshuffled: [],
  songQueue: [],
  songIdx: 0,
  shuffle: false,
  loop: null,
  position: 0,
  playing: true,
  volume: 100,
};

const playbackReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case PREVIOUS:
      newState = _.merge({}, state);
      if (newState.songIdx !== 0 && newState.position > 1) {
        newState.songIdx -= 1;
      }
      return newState;
    case NEXT:
      newState = _.merge({}, state);
      switch (state.loop) {
        case LOOP_ONE:
          newState.position = 0;
          break;
        case LOOP_ALL:
          if (newState.songIdx === newState.songQueue.length - 1) {
            newState.songIdx = 0;
          } else {
            newState.songIdx += 1;
          }
          break;
        case null:
          if (newState.songIdx !== newState.songQueue.length - 1) {
            newState.songIdx += 1;
          }
          break;
      }
      return newState;
    case TOGGLE_PLAYBACK:
      newState = _.merge({}, state);
      newState.playing = !newState.playing;
      return newState;
    case TOGGLE_SHUFFLE:
      newState = _.merge({}, state);
      newState.shuffle = !newState.shuffle;
      const { songQueue, songIdx } = newState;
      if (newState.shuffle) {
        const currentSong = songQueue[songIdx];
        songQueue.splice(songIdx, 1);
        newState.songQueue = [currentSong].concat(shuffle(songQueue));
        newState.songIdx = 0;
      } else {
        newState.songQueue = newState.unshuffled;
      }
      return newState;
    case TOGGLE_LOOP:
      newState = _.merge({}, state);
      switch (newState.loop) {
        case null:
          newState.loop = LOOP_ONE;
          break;
        case LOOP_ONE:
          newState.loop = LOOP_ALL;
          break;
        case LOOP_ALL:
          newState.loop = null;
          break;
      }
      return newState;
    case SEEK:
      newState = _.merge({}, state);
      newState.position = action.position;
      return newState;
    case RECEIVE_VOLUME:
      newState = _.merge({}, state);
      newState.volume = action.volume;
      return newState;
    case RECEIVE_PLAYBACK_SONGS:
      newState = _.merge({}, state);
      newState.songQueue = Object.keys(action.songs);
      newState.unshuffled = newState.songQueue.slice(0);
      newState.songIdx = 0;
      newState.position = 0;
      return newState;
    case RECEIVE_PLAYBACK_SONG:
      newState = _.merge({}, state);
      newState.songQueue.splice(songIdx, 0, action.song.id);
      newState.unshuffled = newState.songQueue.slice(0);
      newState.position = 0;
      return newState;
    default:
      return state;
  }
};

export default playbackReducer;
