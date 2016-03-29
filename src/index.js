import 'babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
//import { syncHistoryWithStore } from 'react-router-redux';
//const history = syncHistoryWithStore(hashHistory, store);
import routes from './routes';
import configStore from './store'

let store = configStore();

render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('root')
);
