/* External libs */
import React from "react";
import { Route, Switch } from "react-router-dom";

/* CSS */
import "./App.css";

/* Local components */
import Home from "components/pages/Home";
import Nav from "components/partials/Nav";
import LovedTracks from "components/pages/LovedTracks";

class App extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col col-2">
            <Nav />
          </div>
          <div className="col col-10">
            {
              <Switch>
                <Route
                  exact
                  key="/"
                  path="/"
                  render={() => {
                    return <Home />;
                  }}
                />
                <Route
                  exact
                  key="/loved"
                  path="/loved"
                  render={() => {
                    return <LovedTracks />;
                  }}
                />
              </Switch>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
