import React from "react";

import { Switch, Route } from "react-router-dom";

import LandingPage from "../views/LandingPage";
import NotFound from "../views/NotFound";

const DefaultRouter: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route component={NotFound} />
  </Switch>
);

export default DefaultRouter;
