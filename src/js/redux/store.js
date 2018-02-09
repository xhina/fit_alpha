import { reducer } from './reducer';
import { createStore } from 'redux';

let store = createStore(reducer);

export function getStore() {
  if (store == null) {
    store = createStore();
  }
  return store;
}
