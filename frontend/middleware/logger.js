import { RECEIVE_POSITION } from '../actions/playback_actions';
import { createLogger } from 'redux-logger';

export default createLogger({
  predicate: (getState, action) => action.type !== RECEIVE_POSITION,
});
