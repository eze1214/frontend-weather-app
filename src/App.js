import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Forecasts from './components/forecasts';
import Forecast from './components/forecast';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Forecasts} />
        <Route exact path="/forecasts" component={Forecasts} />
        <Route exact path="/forecasts/:id" component={Forecast} />
      </Switch>
    </Router>
  );
}

export default App;
