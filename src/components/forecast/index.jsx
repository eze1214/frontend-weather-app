import React from 'react';
import axios from "axios";
import { Paper, Typography, Button } from '@material-ui/core';
import ForecastList from '../forecast-list';

const baseUrl = "http://localhost:3000/v1"
const endpoint = "/forecast"
class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityId: props.match.params.id,
      forecasts: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getCity(this.state.cityId)
      .then(() => this.setState({ isLoading: false }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  getCity(cityId) {
    const forecastEndpoint = (cityId !== 'current') ? `${baseUrl}${endpoint}/${cityId}` : `${baseUrl}${endpoint}`;
    return axios.get(forecastEndpoint)
      .then(result => {
        this.setState({city: result.data.location});
        result.data.weathers.map(forecast => this.state.forecasts.push(forecast))
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    const { forecasts, isLoading, error, city } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="forecast-resume">
      { city && (
        <Typography variant='h5'>Ciudad: {`${city.city || city.name} / ${city.country}`}</Typography>
      )}
        <Button onClick={() => this.props.history.push(`/forecasts`)}>Volver</Button>
        { forecasts.map((forecast, index) =>
          <Paper className="weather-day-container" key={`forecast-list-${index}`}>
            <Typography variant='h5' >
              Fecha: { forecast.date }
              <div className="weather-day">
                <ForecastList forecastList={forecast.weathers} remove={this.removeForecast} options={{remove: false, view: false}} />
              </div>
            </Typography>
          </Paper>
        )}
      </div>
    );
  }
}

export default Forecast;