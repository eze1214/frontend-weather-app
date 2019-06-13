import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Forecasts from './components/forecasts';
import Forecast from './components/forecast';
import NavBar from './components/nav-bar'
function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Router>
        <Switch>
          <Route exact path="/" component={Forecasts} />
          <Route exact path="/forecasts" component={Forecasts} />
          <Route exact path="/forecasts/:id" component={Forecast} />
          <Route exact path="/forecasts/current" component={Forecast} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
