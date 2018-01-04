import _ from 'lodash';
import { RECEIVE_SONGS, RECEIVE_SONG } from '../actions/song_actions';
import { RECEIVE_PLAYBACK_SONGS, RECEIVE_PLAYBACK_SONG } from '../actions/playback_actions';

const initialState = {
  display: {},
  playback: {}
};

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SONGS:
      newState = _.merge({}, state);
      newState.display = action.songs;
      return newState;
    case RECEIVE_SONG:
      newState = _.merge({}, state);
      newState.display[action.song.id] = action.song;
      return newState;
    case RECEIVE_PLAYBACK_SONGS:
      newState = _.merge({}, state);
      newState.playback = action.songs;
      return newState;
    case RECEIVE_PLAYBACK_SONG:
      newState = _.merge({}, state);
      newState.playback[action.song.id] = action.song;
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
