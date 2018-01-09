import { RECEIVE_CURRENT_USER, TOGGLE_ON_ROOT_PAGE } from '../actions/session_actions';
import _ from 'lodash';

const initialState = {
  currentUser: null,
  onRootPage: false
};

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = _.merge({}, state);
      newState.currentUser = action.user;
      return newState;
    case TOGGLE_ON_ROOT_PAGE:
      newState = _.merge({}, state);
      newState.onRootPage = !state.onRootPage;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
