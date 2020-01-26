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
      <>
        <div className='container-fluid nav-container py-2'>
          <div className='row'>
            <div className='col'>
              <Nav />
            </div>
          </div>
        </div>

        {
          <Switch>
            <Route
              exact
              key='/'
              path='/'
              render={() => {
                return <Home />;
              }}
            />
            <Route
              exact
              key='/loved'
              path='/loved'
              render={() => {
                return <LovedTracks />;
              }}
            />
          </Switch>
        }
      </>
    );
  }
}

export default App;
