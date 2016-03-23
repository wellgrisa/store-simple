import {
  FETCH_QUOTE_REQUEST,
  FETCH_QUOTE_SUCCESS,
  FETCH_QUOTE_FAIL,
} from '../actions/quote';

import { NEXT_QUOTE, ADD_QUOTE, GET_QUOTES, ADDING_QUOTE } from '../actions/quote';

const INITIAL_STATE = {
  list: [],
  selected: {},
  isEditing : false
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEXT_QUOTE:
      return {
        ...state,
        selected: state.list[Math.floor(Math.random() * state.list.length)]
      }
    case ADDING_QUOTE:
        return {
          ...state,
          isEditing : true
        }
    case ADD_QUOTE:
        return {
          selected : action.quote,
          list: [...state.list, action.quote],
          isEditing : true
        }
    case GET_QUOTES:
        return {
          selected : action.quotes[0],
          list: [...state.list, ...action.quotes]
        }
  }
  return state
}
