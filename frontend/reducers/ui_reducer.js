import { combineReducers } from 'redux';
import playbackReducer from './playback_reducer';
import menuReducer from './menu_reducer';

const uiReducer = combineReducers({
  playback: playbackReducer,
  menus: menuReducer,
});

export default uiReducer;
