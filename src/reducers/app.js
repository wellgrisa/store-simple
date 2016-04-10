import {
  CHANGE_TITLE
} from '../actions/app';

const INITIAL_STATE = {
  title : 'Início'
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title : action.title
      };
  }
  return state
}
