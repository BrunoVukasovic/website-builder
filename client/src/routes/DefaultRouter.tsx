import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../views/NotFound';

import { SiteViewer, SiteConstructor, ActionContainer } from '../views';

const DefaultRouter: React.FC = () => (
  <Switch>
    <Route path="/" exact>
      <Redirect to="/edit/new-website" />
    </Route>
    <Route path="/action/:action" component={ActionContainer} />
    <Route path="/edit/:site?/:page?" component={SiteConstructor} />
    <Route path="/:site/:page?" component={SiteViewer} />
    <Route component={NotFound} />
  </Switch>
);

export default DefaultRouter;
