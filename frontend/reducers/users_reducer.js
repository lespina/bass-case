import _ from 'lodash';
import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../actions/follow_actions';

const initialState = null;

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_USER:
      newState = _.merge({}, state);
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_LIKE:
      newState = _.merge({}, state);
      const userReceiveLikes = newState[action.like.userId].likes;
      userReceiveLikes[action.like.songId] = action.like.id;
      return newState;
    case REMOVE_LIKE:
      newState = _.merge({}, state);
      const userRemoveLikes = newState[action.like.userId].likes;
      delete userRemoveLikes[action.like.songId];
      return newState;
    case RECEIVE_FOLLOW:
      newState = _.merge({}, state);
      const userReceiveFollows = newState[action.follow.followerId].follows;
      userReceiveFollows[action.follow.followeeId] = action.follow.id;
      return newState;
    case REMOVE_FOLLOW:
      newState = _.merge({}, state);
      const userRemoveFollows = newState[action.follow.followerId].follows;
      delete userRemoveFollows[action.follow.followeeId];
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
