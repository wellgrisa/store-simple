import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ALL
} from '../actions/document';

import { ADD } from '../actions/document';

const INITIAL_STATE = {
  name : '',
  items : []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      state.items.push(action.document);
      return {
        ...state,
        name : action.document.name
      };
    case ALL:
      return {
        ...state,
        items : action.items,
      };
  }
  return state
}
