export const RECEIVE_MORE_ACTIONS_INDEX = "RECEIVE_MORE_ACTIONS_INDEX";

export const receiveMoreActionsIndex = (menuType, moreActionsIdx) => ({
  type: RECEIVE_MORE_ACTIONS_INDEX,
  menuType,
  moreActionsIdx
});
