
import * as documentApi from '../api/document'

export const ADD = 'ADD';
export const GET = 'GET';
export const ALL = 'ALL';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

export function next() {
  return { type: NEXT_QUOTE }
}

export function adding() {
  return { type: ADDING_QUOTE }
}

export function success(document) {
  return { type: ADD, document : document }
}

export function save(document) {
  return success(documentApi.save(document));
}

export function getAll(){
  return async (dispatch) => {
    dispatch({ type: FETCH_REQUEST });

    try {
      dispatch({ type: ALL, items: await documentApi.getAll() });
    } catch (error) {
      dispatch({ type: FETCH_FAIL, error });
    }
  };
}
