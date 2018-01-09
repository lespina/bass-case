import _ from 'lodash';
import { RECEIVE_MORE_ACTIONS_INDEX } from '../actions/menu_actions';

const initialState = {
  moreActionsIdx: null,
};

const menuReducer = (state = initialState, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_MORE_ACTIONS_INDEX:
      newState = _.merge({}, state);
      newState.moreActionsIdx = action.moreActionsIdx;
      return newState;
    default:
      return state;
  }
};

export default menuReducer;
