import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Results from "./containers/Results";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/results/:nameParam">
        <Results />
      </Route>
    </Switch>
  );
}