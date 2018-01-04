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
  songQueue: [],
  songIdx: 0,
  shuffle: false,
  loop: null,
  position: 0,
  playing: false,
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
      if (state.loop) {
        newState.position = 0;
      } else if (newState.songIdx !== newState.songQueue.length - 1) {
        newState.songIdx += 1;
      }
      return newState;
    case TOGGLE_PLAYBACK:
      newState = _.merge({}, state);
      newState.playing = !newState.playing;
      return newState;
    case TOGGLE_SHUFFLE:
      newState = _.merge({}, state);
      newState.shuffle = !newState.shuffle;
      if (newState.shuffle) {
        shuffle(newState.songQueue);
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
      newState.songIdx = 0;
      newState.position = 0;
      return newState;
    case RECEIVE_PLAYBACK_SONG:
      newState = _.merge({}, state);
      newState.songQueue.splice(songIdx, 0, action.song.id);
      newState.position = 0;
      return newState;
    default:
      return state;
  }
};

export default playbackReducer;
