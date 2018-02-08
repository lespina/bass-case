import _ from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS, RECEIVE_USER, RECEIVE_LIKE, REMOVE_LIKE } from '../actions/user_actions';

import { RECEIVE_REPOST, REMOVE_REPOST } from '../actions/repost_actions';
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../actions/follow_actions';

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_USERS:
      newState = _.merge({}, action.users);
      for (let userId in newState) {
        newState[userId].likedSongIds = new Set(newState[userId].likedSongIds);
      }
      return newState;
    case RECEIVE_USER:
      newState = _.merge({}, state);
      newState[action.user.id] = action.user;
      newState[action.user.id].likedSongIds = new Set(action.user.likedSongIds);
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
      const userReceiveFollows = newState[action.follow.followerId].follows;
      userReceiveFollows[action.follow.followeeId] = action.follow.id;
      const userReceiveFolloweeIds = newState[action.follow.followerId].followeeIds;
      userReceiveFolloweeIds.push(action.follow.followeeId);
      const userGiveFollowerIds = newState[action.follow.followeeId].followerIds;
      userGiveFollowerIds.push(action.follow.followerId);
      return newState;
    case REMOVE_FOLLOW:
      newState = _.merge({}, state);
      const userRemoveFollows = newState[action.follow.followerId].follows;
      delete userRemoveFollows[action.follow.followeeId];
      const userRemoveFolloweeIds = newState[action.follow.followerId].followeeIds;
        const idxToRemove1 = userRemoveFolloweeIds.indexOf(action.follow.followeeId);
        userRemoveFolloweeIds.splice(idxToRemove1, 1);
      const userDeleteFollowerIds = newState[action.follow.followeeId].followerIds;
        const idxToRemove2 = userDeleteFollowerIds.indexOf(action.follow.followerId);
        userDeleteFollowerIds.splice(idxToRemove2, 1);
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
