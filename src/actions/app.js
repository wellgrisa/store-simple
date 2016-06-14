export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const SET_TOOLBAR_BUTTONS = 'SET_TOOLBAR_BUTTONS';
export const SET_TOOLBAR_CUSTOM_GROUP = 'SET_TOOLBAR_CUSTOM_GROUP';

export function title(title) {
  return { type: CHANGE_TITLE, title };
}

export function setToolbarButtons(buttons) {
  return { type: SET_TOOLBAR_BUTTONS, buttons};
}

export function setToolbarCustomGroup(customGroups) {
  return { type: SET_TOOLBAR_CUSTOM_GROUP, customGroups};
}
