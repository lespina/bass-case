import _ from 'lodash';
import shuffle from 'shuffle-array';

import {
  RECEIVE_POSITION,
  RECEIVE_DURATION,
  PREVIOUS,
  TOGGLE_PLAYBACK,
  NEXT,
  TOGGLE_SHUFFLE,
  TOGGLE_LOOP,
  SEEK,
  TOGGLE_MUTE,
  RECEIVE_VOLUME,
  RECEIVE_PLAYBACK_SONGS,
  RECEIVE_NEW_PLAYBACK_SONGS,
  RECEIVE_PLAYBACK_SONG,
  ADD_TO_NEXT_UP,
  RECEIVE_PLAYBACK_SONG_FROM_QUEUE,
  CLEAR_QUEUE,
  UPDATE_QUEUE
} from '../actions/playback_actions';

export const LOOP_ONE = "LOOP_ONE";
export const LOOP_ALL = "LOOP_ALL";

const initialState = {
  duration: null,
  unshuffled: [],
  songQueue: [],
  songIdx: 0,
  shuffle: false,
  loop: null,
  position: 0,
  playing: false,
  volume: 50,
  mute: false,
  lastAction: null,
};

const playbackReducer = (state = initialState, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_DURATION:
      newState = _.merge({}, state);
      newState.duration = action.duration;
      newState.lastAction = action.type;
      return newState;
    case PREVIOUS:
      newState = _.merge({}, state);
      if (newState.songIdx !== 0 && newState.position < 1000) {
        newState.songIdx -= 1;
      }
      newState.position = 0;
      newState.lastAction = action.type;
      newState.playing = true;
      return newState;
    case NEXT:
      newState = _.merge({}, state);
      switch (state.loop) {
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
      newState.position = 0;
      newState.lastAction = action.type;
      newState.playing = true;
      return newState;
    case TOGGLE_PLAYBACK:
      newState = _.merge({}, state);
      newState.playing = !newState.playing;
      newState.lastAction = action.type;
      return newState;
    case TOGGLE_SHUFFLE:
      newState = _.merge({}, state);
      newState.shuffle = !newState.shuffle;
      const { songQueue, songIdx, unshuffled } = newState;
      if (newState.shuffle) {
        const currentSong = songQueue[songIdx];
        songQueue.splice(songIdx, 1);
        newState.songQueue = [currentSong].concat(shuffle(songQueue));
        newState.songIdx = 0;
      } else {
        const songId = songQueue[songIdx];
        newState.songIdx = unshuffled.indexOf(songId);
        newState.songQueue = newState.unshuffled.slice(0);
      }
      newState.lastAction = action.type;
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
      newState.lastAction = action.type;
      return newState;
    case RECEIVE_POSITION:
    case SEEK:
      newState = _.merge({}, state);
      newState.position = action.position;
      newState.lastAction = action.type;
      return newState;
    case TOGGLE_MUTE:
      newState = _.merge({}, state);
      newState.mute = !newState.mute;
      newState.lastAction = action.type;
      return newState;
    case RECEIVE_VOLUME:
      newState = _.merge({}, state);
      newState.volume = action.volume;
      newState.lastAction = action.type;
      return newState;
    case RECEIVE_PLAYBACK_SONGS:
      newState = _.merge({}, state);
      newState.songQueue = shuffle(Object.keys(action.songs));
      newState.unshuffled = newState.songQueue.slice(0);
      newState.songIdx = 0;
      newState.position = 0;
      newState.lastAction = action.type;
      return newState;
    case RECEIVE_NEW_PLAYBACK_SONGS:
      newState = _.merge({}, state);
      const oldSongIdx = state.songIdx;
      newState.songQueue =
        state.songQueue.slice(oldSongIdx, oldSongIdx + 1)
        .concat(shuffle(Object.keys(action.songs)));
      newState.unshuffled = newState.songQueue.slice(0);
      newState.shuffle = false;
      newState.songIdx = 0;
      newState.lastAction = action.type;
      return newState;
    case RECEIVE_PLAYBACK_SONG:
      newState = _.merge({}, state);
      newState.songQueue.splice(state.songIdx + 1, 0, action.songId.toString());
      newState.unshuffled.push(action.songId.toString());
      newState.position = 0;
      newState.lastAction = action.type;
      newState.playing = true;
      newState.songIdx += 1;
      return newState;
    case ADD_TO_NEXT_UP:
      newState = _.merge({}, state);
      newState.songQueue.splice(state.songIdx + 1, 0, action.songId.toString());
      newState.unshuffled.push(action.songId.toString());
      newState.lastAction = action.type;
      return newState;
    case RECEIVE_PLAYBACK_SONG_FROM_QUEUE:
      newState = _.merge({}, state);
      newState.songIdx = action.songIdx;
      newState.lastAction = action.type;
      newState.position = 0;
      newState.playing = true;
      return newState;
    case CLEAR_QUEUE:
      newState = _.merge({}, state);
      newState.songQueue = [state.songQueue[state.songIdx]];
      newState.unshuffled = newState.songQueue.slice(0);
      newState.shuffle = false;
      newState.songIdx = 0;
      newState.lastAction = action.type;
      return newState;
    case UPDATE_QUEUE:
      newState = _.merge({}, state);
      newState.songQueue = action.songQueue;
      newState.songIdx = action.songIdx;
      newState.unshuffled = newState.songQueue.slice(0);
      newState.lastAction = action.type;
      return newState;
    default:
      return state;
  }
};

export default playbackReducer;
