import { CHANGE_GENDER, SELECT_ITEM, BUY_ITEM } from './actions';

export function reducer(state, action) {
  if (action.type == BUY_ITEM) {

  }
  return Object.assign({}, state, action);
}
