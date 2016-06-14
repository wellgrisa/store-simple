import * as documentApi from '../api/document'

export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const GET = 'GET';
export const ALL = 'ALL';
export const SAVE = 'SAVE';
export const SELECT = 'SELECT';
export const FETCH_ITEM = 'FETCH_ITEM';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const TOGGLE_SHOW_DIALOG = 'TOGGLE_SHOW_DIALOG';

export function next() {
  return { type: NEXT_QUOTE };
}

export function adding() {
  return { type: ADDING_QUOTE };
}

export function success(document) {
  return { type: ADD, document : document };
}

export function edit(document) {
  return { type: EDIT, document : document };
}

export function select(document) {
  return { type: SELECT, document : document };
}

export function fetch(id) {
  return { type: FETCH_ITEM, id };
}

export function toggleShowDialog() {
  return { type: TOGGLE_SHOW_DIALOG };
}

export function add(document) {
  return { type: ADD };
}

export function save(document) {
  return async (dispatch) => {
    dispatch({ type: SAVE, result : await documentApi.save(document) });
  }
}

export function remove(items) {
  return async (dispatch) => {
      documentApi.remove(items);
      dispatch({ type: ALL, items: await documentApi.getAll() });
  }
}

export function getAll(searchTerm){
  return async (dispatch) => {
    dispatch({ type: FETCH_REQUEST });
    try {
      dispatch({ type: ALL, items: await documentApi.getAll(), searchTerm });
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({ type: FETCH_FAIL, error });
    }
  };
}
