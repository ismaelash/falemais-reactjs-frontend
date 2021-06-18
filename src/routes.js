import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import CUOriginDestiny from "./cu-origindestiny";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/cu-origindestiny" component={CUOriginDestiny} />
      </Switch>
    </BrowserRouter>
  );
}
