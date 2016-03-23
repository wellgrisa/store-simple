import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from '../actions/document';

import { ADD } from '../actions/document';

const INITIAL_STATE = {
  name : ''
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state
      }
  }
  return state
}
