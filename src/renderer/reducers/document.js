import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  TOGGLE_SHOW_DIALOG,
  ALL,
  EDIT,
  SAVE,
  SELECT,
  FETCH_ITEM,
  RESET
} from '../actions/document';

import { ADD } from '../actions/document';

const INITIAL_STATE = {
  name : '',
  items : [],
  isLoading : false,
  showDialog : false,
  selectedItem : {},
  selectedLength : 0
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        selectedItem : {},
        showDialog : true
      };
    case RESET:
      return {
        ...INITIAL_STATE
      };
    case SAVE:
      let existentItemIndex = action.result[1]
        ? state.items.findIndex(x => x._id === action.result[1]._id)
        : -1;
      let items = existentItemIndex === -1
        ? [action.result, ...state.items]
        : [
            ...state.items.slice(0, existentItemIndex),
            action.result[1],
            ...state.items.slice(existentItemIndex + 1)
          ]
      return {
        ...state,
        items: sortAlphabetically(items),
      };
    case ALL:
      const allItems = action.searchTerm ? action.items.filter(action.searchTerm) : action.items;
      return {
        ...state,
        items: sortAlphabetically(allItems),
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
    case FETCH_ITEM:
      return {
        ...state,
        selectedItem : action.selectedItem,
        isLoading : false
      };
    case SELECT:
      let selectItems = updateArray(state.items, {
        ...action.document,
        selected : !action.document.selected
      });
      return {
        ...state,
        items : selectItems,
        selectedLength : selectItems.filter(x => x.selected).length,
        selectedItem : action.document
      };
  }
  return state
}

const updateArray = (array, item) => {
  let selectedItemIndex = array.findIndex(x => x._id === item._id);
  return [
    ...array.slice(0, selectedItemIndex),
    item,
    ...array.slice(selectedItemIndex + 1)
  ]
}

const sortAlphabetically = items => items
  .sort(({ name: prev }, { name: next }) => {
    const textPrev = prev.toLowerCase();
    const textNext = next.toLowerCase();
    return (textPrev < textNext) ? -1 : (textPrev > textNext) ? 1 : 0
  });