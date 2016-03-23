import { combineReducers } from 'redux';

import quote from './quote';
import document from './document';

export default combineReducers({
  quote,
  document
});
