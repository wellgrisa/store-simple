import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default function configStore() {
  return createStoreWithMiddleware(reducers)
}
