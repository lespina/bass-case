import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import _ from 'lodash';

const initialState = {
  currentUser: null,
};

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = _.merge({}, state);
      newState.currentUser = action.user;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;