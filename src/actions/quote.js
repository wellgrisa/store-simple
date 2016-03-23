
import * as quoteApi from '../api/quote'

export const ADD_QUOTE = 'ADD_QUOTE';
export const NEXT_QUOTE = 'NEXT_QUOTE';
export const GET_QUOTES = 'GET_QUOTES';
export const ADDING_QUOTE = 'ADDING_QUOTE';
export const FETCH_QUOTE_REQUEST = 'FETCH_QUOTE_REQUEST';
export const FETCH_QUOTE_SUCCESS = 'FETCH_QUOTE_SUCCESS';
export const FETCH_QUOTE_FAIL = 'FETCH_QUOTE_FAIL';

export function next() {
  return { type: NEXT_QUOTE }
}

export function adding() {
  return { type: ADDING_QUOTE }
}

export function add(quote) {
  return { type: ADD_QUOTE, quote : quote }
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
