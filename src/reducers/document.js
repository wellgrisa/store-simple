import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  TOGGLE_SHOW_DIALOG,
  ALL,
  EDIT
} from '../actions/document';

import update from 'react-addons-update';

import { ADD } from '../actions/document';

const INITIAL_STATE = {
  name : '',
  items : [],
  isLoading : false,
  showDialog : false,
  selectedItem : {}
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        items : [action.document, ...state.items]
      };
    case ALL:
      return {
        ...state,
        items : action.items,
        isLoading : false,
      };
    case TOGGLE_SHOW_DIALOG:
      return {
        ...state,
        showDialog : !state.showDialog
      };
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading : true,
      };
    case EDIT:
      return {
        ...state,
        selectedItem : action.document,
        showDialog : true
      };
  }
  return state
}
