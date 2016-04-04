import 'babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configStore from './store'

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let store = configStore();

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
      onUpdate={() => window.scrollTo(0, 0)}
    />
  </Provider>,
  document.getElementById('root')
);
