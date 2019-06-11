import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Forecast } from '../../models/forecast';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: '5px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));

class ForecastItem extends React.Component {
  render() {
    const classes = useStyles;
    const { city, country, humidity, conditions, maxTemperature, minTemperature, date } = this.props.forecast;
    return (
      <Card className="weather-card">
        <div className={classes.details}>
          { date && (
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              date
            </Typography>
          )}
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              { city }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              { country }
            </Typography>
          </CardContent>
        </div>
        <div>
          <Typography variant="subtitle1" color="textSecondary">
            Humidity: { humidity } Conditions: { conditions }
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            { `${maxTemperature} / ${minTemperature}` }
          </Typography>
        </div>
        <div>
            { this.props.options.remove && (
              <Button onClick={() => this.props.remove() }>
                Eliminar
              </Button>
            )}
            { this.props.options.remove && (
              <Button onClick={() => this.props.view() }>
                Ver
              </Button>
            )}
        </div>
      </Card>
    );
  }
}

ForecastItem.propTypes = {
  forecast: PropTypes.any,
  remove: PropTypes.func,
  view: PropTypes.func,
  options: PropTypes.shape({
    remove: PropTypes.bool,
    view: PropTypes.bool
  })
}

ForecastItem.defaultProps = {
  options: {
    remove: true,
    view: true
  }
}

export default ForecastItem;