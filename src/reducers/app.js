import {
  CHANGE_TITLE,
  SET_TOOLBAR_BUTTONS,
  SET_TOOLBAR_CUSTOM_GROUP
} from '../actions/app';

const INITIAL_STATE = {
  title : 'Início',
  buttons : [],
  customGroups : []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title : action.title
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
  }
  return state
}
