import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux'

import document from './document';

export default combineReducers({
  document,
  form: formReducer,
  routing: routerReducer
});
