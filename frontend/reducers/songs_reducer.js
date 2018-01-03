import _ from 'lodash';
import { RECEIVE_SONGS, RECEIVE_SONG } from '../actions/song_actions';

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SONGS:
      return action.songs;
    case RECEIVE_SONG:
      newState = _.merge({}, state);
      newState[action.song.id] = action.song;
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
