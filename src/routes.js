import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { App, About, Home, People, PersonDetail } from './containers';

export default (
  <Route component={App}>
    <Route path="/" component={People} />
    <Route path="/people" component={People} />
    <Route path="/person/add" component={PersonDetail} />
    <Route path="/person/:id/edit" component={PersonDetail} />
    <Route path="/about" component={About} />
  </Route>
);
