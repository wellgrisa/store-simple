import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { App, About, Home } from './containers';

export default (
  <Route component={App}>
    <IndexRoute component={Home} />
    <Route path="/" component={Home} />
    <Route path="about" component={About} />
  </Route>
);
