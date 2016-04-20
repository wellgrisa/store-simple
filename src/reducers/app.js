import {
  CHANGE_TITLE,
  Actions,
} from '../actions/app';

import { model } from '../components/common/model';

const INITIAL_STATE = {
  title : 'Início',
  forms : [
    { primaryText: 'Inicio', path: '/', model, instance : 'forms' },
    { primaryText: 'Sobre', path: '/about', model },
    { primaryText: 'Forms', path: '/', model },
  ],
  selectedForm : { primaryText: 'Inicio', path: '/', model, instance : 'forms' }
};

export default function reducer(state = INITIAL_STATE, action) {
  debugger;
  switch (action.type) {
    case Actions.CHANGE_TITLE:
      return {
        ...state,
        title : action.form.primaryText,
        selectedForm : action.form
      };
    case Actions.ALL:
      return {
        ...state,
        forms : [...state.forms, action.items]
      };
  }
  return state
}
