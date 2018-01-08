import _ from 'lodash';
import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';

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
    default:
      return state;
  }
};

export default usersReducer;
