import common from './common';
import * as appApi from '../api/app';

export const Actions = {
  ...common('APP'),
  CHANGE_TITLE : 'CHANGE_TITLE'
}

export function title(form) {
  return { type: Actions.CHANGE_TITLE, form };
}

export function save(document, instance) {
  return async (dispatch) => {
    dispatch({ type: Actions.SAVE, result : await appApi.saveInstance(document, instance) });
  }
}

export function getAll(){
  return async (dispatch) => {
    dispatch({ type: Actions.FETCH_REQUEST });

    try {
      dispatch({ type: Actions.ALL, items: await appApi.getAll() });
    } catch (error) {
      dispatch({ type: Actions.FETCH_FAIL, error });
    }
  };
}
