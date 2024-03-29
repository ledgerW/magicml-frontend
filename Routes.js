import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import Results from "./containers/Results";
import About from "./containers/About";
import FAQ from "./containers/FAQ";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/similarity">
        <Results/>
      </Route>
      <Route path="/similarity/:nameParam">
        <Results/>
      </Route>
      <Route path="/about">
        <About/>
      </Route>
      <Route path="/faq">
        <FAQ/>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}