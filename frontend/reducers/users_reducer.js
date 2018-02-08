import _ from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS, RECEIVE_USER, RECEIVE_LIKE, REMOVE_LIKE, RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../actions/user_actions';

import { RECEIVE_REPOST, REMOVE_REPOST } from '../actions/repost_actions';
// import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../actions/follow_actions';

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState;
  let follower;
  let followee;
  switch (action.type) {
    case RECEIVE_USERS:
      newState = _.merge({}, action.users);
      for (let userId in newState) {
        newState[userId].likedSongIds = new Set(newState[userId].likedSongIds);
        newState[userId].followerIds = new Set(newState[userId].followerIds);
        newState[userId].followeeIds = new Set(newState[userId].followeeIds);
      }
      return newState;
    case RECEIVE_USER:
      newState = _.merge({}, state);
      newState[action.user.id] = action.user;
      newState[action.user.id].likedSongIds = new Set(action.user.likedSongIds);
      newState[action.user.id].followerIds = new Set(newState[action.user.id].followerIds);
      newState[action.user.id].followeeIds = new Set(newState[action.user.id].followeeIds);
      return newState;
    case RECEIVE_LIKE:
      newState = _.merge({}, state);
      newState[action.userId].likedSongIds.add(action.songId);
      return newState;
    case REMOVE_LIKE:
      newState = _.merge({}, state);
      newState[action.userId].likedSongIds.delete(action.songId);
      return newState;
    case RECEIVE_REPOST:
      newState = _.merge({}, state);
      const userReceiveReposts = newState[action.repost.userId].reposts;
      userReceiveReposts[action.repost.songId] = action.repost.id;
      return newState;
    case REMOVE_REPOST:
      newState = _.merge({}, state);
      const userRemoveReposts = newState[action.repost.userId].reposts;
      delete userRemoveReposts[action.repost.songId];
      return newState;
    case RECEIVE_FOLLOW:
      newState = _.merge({}, state);
      follower = newState[action.followerId];
      followee = newState[action.followeeId];
      follower.followeeIds.add(action.followeeId);
      followee.followerIds.add(action.followerId);
      return newState;
    case REMOVE_FOLLOW:
      newState = _.merge({}, state);
      follower = newState[action.followerId];
      followee = newState[action.followeeId];
      follower.followeeIds.delete(action.followeeId);
      followee.followerIds.delete(action.followerId);
      return newState;
    case RECEIVE_CURRENT_USER:
      if (!action.user) { return state; }
      newState = _.merge({}, state);
      if (!Boolean(newState[action.user.id])) {
        newState[action.user.id] = action.user;
      }
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
