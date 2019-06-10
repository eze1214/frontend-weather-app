import React from 'react';
import axios from 'axios';
import { Forecast } from '../../models/forecast';
import { Paper } from '@material-ui/core';
import ForecastList from '../forecast-list';

const baseUrl = "http://localhost:3000/v1"
const endpoint = "/current"
class Forecasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      forecasts: []
    }
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

  getSavedCities() {
    const cities = JSON.parse(localStorage.getItem('cities'));
    console.log(cities);
    if (cities) {
      return Promise.all(
        cities.map(
          city => axios.get(`${baseUrl}${endpoint}/${city}`)
          .then(result => {
            this.state.forecasts.push(new Forecast(result.data))
          })
          .catch(error => this.setState({
            error,
            isLoading: false
          }))
        )
      );
    } else {
      return Promise.resolve;
    }
  }

  getCurrentCity() {
    return axios.get(`${baseUrl}${endpoint}`)
      .then(result => {
        this.state.forecasts.push(new Forecast(result.data))
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    const { forecasts, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <Paper>
        <ForecastList forecastList={forecasts} />
      </Paper>
    );
  }
}

export default Forecasts;