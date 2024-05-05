import { RECEIVE_SONG_ERRORS, RECEIVE_SONG, RECEIVE_SONGS } from '../actions/song_actions';
import _ from 'lodash';

const songErrorsReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_SONGS:
      return {};
    case RECEIVE_SONG:
      return {};
    case RECEIVE_SONG_ERRORS:
      if (action.replace) {
        return action.errors;
      } else {
        newState = _.merge({}, state, action.errors);
      }
      return newState;
    default:
      return state;
  }
};

export default songErrorsReducer;
