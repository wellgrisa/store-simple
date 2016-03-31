import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import document from './document';

export default combineReducers({
  document,
  form: formReducer
});
