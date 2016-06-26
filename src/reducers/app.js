import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  MENU_CLICKED,
  SET_TOOLBAR_BUTTONS,
  SET_TOOLBAR_CUSTOM_GROUP
} from '../actions/app';

const INITIAL_STATE = {
  title : 'Início',
  currentView : 'people',
  buttons : [],
  customGroups : [],
  isLoading : false
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MENU_CLICKED:
      return {
        ...state,
        title : action.menuItem.primaryText,
        currentView : action.menuItem.key
      };
    case SET_TOOLBAR_BUTTONS:
      return {
        ...state,
        buttons : action.buttons
      };
    case SET_TOOLBAR_CUSTOM_GROUP:
      return {
        ...state,
        customGroups : action.customGroups
      };
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading : true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading : false,
      };
  }
  return state
}
