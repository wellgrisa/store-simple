import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ALL
} from '../actions/document';

import { ADD } from '../actions/document';

const INITIAL_STATE = {
  name : '',
  items : [],
  isLoading : false
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        items : [...state.items, action.document]
      };
    case ALL:
      return {
        ...state,
        items : action.items,
        isLoading : false,
      };
    case FETCH_REQUEST:
      console.log(FETCH_REQUEST);
      return {
        ...state,
        isLoading : true,
      };
  }
  return state
}
