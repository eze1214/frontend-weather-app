import React from 'react';
import axios from "axios";
import { Paper } from '@material-ui/core';
import ForecastList from '../forecast-list';

const baseUrl = "http://localhost:3000/v1"
const endpoint = "/forecast"
class Forecast extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      cityId: props.match.params.id,
      forecasts: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getCity(this.state.cityId)
      .then(() => this.setState({isLoading: false}))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  getCity(cityId) {
    return axios.get(`${baseUrl}${endpoint}/${cityId}`)
      .then(result => {
        result.map(forecast => this.state.forecasts.push(forecast))
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

export default Forecast;