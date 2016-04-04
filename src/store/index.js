import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducers from '../reducers';

const router = routerMiddleware(hashHistory);

let createStoreWithMiddleware = applyMiddleware(thunk, router)(createStore);

export default function configStore() {
  return createStoreWithMiddleware(reducers)
}
