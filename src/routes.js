import React from 'react';
import { Router, Route } from 'react-router';
import { App, Login, Home } from './containers';

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
  </Route>
);
