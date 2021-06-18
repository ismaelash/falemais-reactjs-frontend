import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import CRUDOriginDestiny from "./crud-origindestiny";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/crud-origindestiny" component={CRUDOriginDestiny} />
        <Route exact path="/crud-plan" component={CRUDOriginDestiny} />
      </Switch>
    </BrowserRouter>
  );
}
