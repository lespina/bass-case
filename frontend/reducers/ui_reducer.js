import { combineReducers } from 'redux';
import playbackReducer from './playback_reducer';

const uiReducer = combineReducers({
  playback: playbackReducer,
});

export default uiReducer;
