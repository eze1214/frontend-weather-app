import React from 'react';
import axios from 'axios';
import { Forecast } from '../../models/forecast';
import { Paper, Button } from '@material-ui/core';
import ForecastList from '../forecast-list';
import SelectForecast from '../select-forecast';
import '../../App.css';

const baseUrl = "http://localhost:3000/v1"
const endpoint = "/current"
const maxWeathers = 5;

class Forecasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showAddForecast: false,
      forecasts: []
    }
    this.addForecast = this.addForecast.bind(this);
    this.removeForecast = this.removeForecast.bind(this);
    this.showAddForecast = this.showAddForecast.bind(this);
    this.viewForecast = this.viewForecast.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([ this.getSavedCities(), this.getCurrentCity() ])
      .then(() => this.setState({isLoading: false}))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  removeForecast(index) {
    const cities = JSON.parse(localStorage.getItem('cities'));
    this.state.forecasts.splice(index, 1);
    cities.splice(index, 1);
    localStorage.setItem('cities', JSON.stringify(cities));
    this.setState({});
  }

  viewForecast(index) {
    const { history } = this.props;
    const { forecasts } = this.state;
    console.log(forecasts);
    history.push(`/forecasts/${forecasts[index].id}`)
  }

  addForecast(city) {
    this.setState({
      showAddForecast: false,
      isLoading: true
    });
    const cities = JSON.parse(localStorage.getItem('cities'));
    if (!cities) {
      localStorage.setItem('cities', JSON.stringify([city.id]));
    } else {
      cities.push(city.id);
      localStorage.setItem('cities', JSON.stringify(cities));
    }
    this.getForecast(city.id);
  }

  getSavedCities() {
    const cities = JSON.parse(localStorage.getItem('cities'));
    if (cities) {
      return Promise.all(
        cities.map(cityId => this.getForecast(cityId))
      );
    } else {
      return Promise.resolve;
    }
  }

  getForecast(cityId) {
    return axios.get(`${baseUrl}${endpoint}/${cityId}`)
      .then(result => {
        this.state.forecasts.push(new Forecast(cityId, result.data));
        this.setState({});
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  getCurrentCity() {
    return axios.get(`${baseUrl}${endpoint}`)
      .then(result => {
        this.state.forecasts.push(new Forecast(result.data.weather.id, result.data))
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  showAddForecast() {
    const { forecasts } = this.state;
    if (forecasts.length < maxWeathers) {
      this.setState({ showAddForecast: true });
    } else {
      this.setState({ error: {message: 'Only 5 forecasts are allowed'}});
    }
  }

  render() {
    const { forecasts, isLoading, error, showAddForecast } = this.state;

    return (
      <div className="forecast-body">
      {
        showAddForecast && (
          <SelectForecast selectOption={this.addForecast} />
        )
      }
      
        
      {
        error && <p>{error.message}</p>
      }
      {
        isLoading && <p>Loading ...</p>
      }
      <Button onClick={this.showAddForecast}>Agregar</Button>
      <Paper className="cities-forecast-container">
        <ForecastList
          forecastList={forecasts}
          view={this.viewForecast}
          remove={this.removeForecast}
        />
      </Paper>
    </div>
    );
  }
}

export default Forecasts;