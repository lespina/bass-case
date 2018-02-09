import { RECEIVE_POSITION, RECEIVE_DURATION } from '../actions/playback_actions';
import logger, { createLogger } from 'redux-logger';

export default createLogger({
  predicate: (getState, action) => {
    return action.type !== RECEIVE_POSITION &&
           action.type !== RECEIVE_DURATION;
  },
});
