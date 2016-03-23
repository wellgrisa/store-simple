
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
  return { type: FETCH_SUCCESS, document : documentApi.save(document) }
}

export function save(document) {
  return (dispatch) => {
    dispatch({ type: FETCH_REQUEST });

    try {
      dispatch(success(document));
    } catch (error) {
      dispatch({ type: FETCH_FAIL, error });
    }
  };
}

export function getQuotes(){
  return { type: GET_QUOTES, quotes: quoteApi.getAll() }
}

export function getAll() {
//  return { type: ACTIONS.GET_QUOTES, quotes : quotes }
  return (dispatch) => {
    dispatch({ type: FETCH_QUOTE_REQUEST });

    try {
      dispatch(getQuotes());
    } catch (error) {
      dispatch({ type: FETCH_QUOTE_FAIL, error });
    }
  };
}
