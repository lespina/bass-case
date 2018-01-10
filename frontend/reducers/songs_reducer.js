import _ from 'lodash';
import { RECEIVE_SONGS, RECEIVE_SONG } from '../actions/song_actions';
import { RECEIVE_PLAYBACK_SONGS, RECEIVE_PLAYBACK_SONG } from '../actions/playback_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { RECEIVE_REPOST, REMOVE_REPOST } from '../actions/repost_actions';

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SONGS:
      newState = _.merge({}, state);
      newState = action.songs;
      return newState;
    case RECEIVE_SONG:
      newState = _.merge({}, state);
      newState[action.song.id] = action.song;
      return newState;
    case RECEIVE_LIKE:
      newState = _.merge({}, state);
      const likedSong = newState[action.like.songId];
      likedSong.numLikes += 1;
      if (likedSong.likerIds) {
        likedSong.likerIds.push(action.like.userId);
      }
      return newState;
    case REMOVE_LIKE:
      newState = _.merge({}, state);
      const unlikedSong = newState[action.like.songId];
      unlikedSong.numLikes -= 1;
      if (unlikedSong.likerIds) {
        const unlikerIdx = unlikedSong.likerIds.indexOf(action.like.userId);
        unlikedSong.likerIds.splice(unlikeIdx, 1);
      }
      return newState;
    case RECEIVE_REPOST:
      newState = _.merge({}, state);
      const repostedSong = newState[action.repost.songId];
      repostedSong.numReposts += 1;
      if (repostedSong.reposterIds) {
        repostedSong.reposterIds.push(action.repost.userId);
      }
      return newState;
    case REMOVE_REPOST:
      newState = _.merge({}, state);
      const unrepostedSong = newState[action.repost.songId];
      unrepostedSong.numReposts -= 1;
      if (unrepostedSong.reposterIds) {
        const unreposterIdx = unrepostedSong.repostrIds.indexOf(action.repost.userId);
        unrepostdSong.reposterIds.splice(unrepostIdx, 1);
      }
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
