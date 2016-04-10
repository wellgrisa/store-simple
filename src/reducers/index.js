import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux'

import app from './app';
import document from './document';

export default combineReducers({
  document,
  app,
  form: formReducer,
  routing: routerReducer
});
