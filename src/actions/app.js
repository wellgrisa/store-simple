export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const MENU_CLICKED = 'MENU_CLICKED';
export const SET_TOOLBAR_BUTTONS = 'SET_TOOLBAR_BUTTONS';
export const SET_TOOLBAR_CUSTOM_GROUP = 'SET_TOOLBAR_CUSTOM_GROUP';

export function menuClicked(menuItem) {
  return { type: MENU_CLICKED, menuItem };
}

export function setToolbarButtons(buttons) {
  return { type: SET_TOOLBAR_BUTTONS, buttons};
}

export function setToolbarCustomGroup(customGroups) {
  return { type: SET_TOOLBAR_CUSTOM_GROUP, customGroups};
}
