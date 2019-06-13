import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  card: {
    display: 'flex',
    width: '5px',
    backgroundColor: "#f5f5f5"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto'
  },
  description: {
    margin: '12px'
  },
  cover: {
    width: 151,
  },
};


class ForecastItem extends React.Component {
  render() {
    const { classes } = this.props;
    const { city, time, temp, country, humidity, conditions, maxTemperature, minTemperature, date } = this.props.forecast;
    return (
      <Card className="weather-card" color="default">
        { city && country && (
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
        )}
        <div className={classes.description}>
          { time && (
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Time: { time }
            </Typography>
          )}
          <Typography variant="subtitle1" color="textSecondary">
            Temperature: { temp } °C
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Humidity: { humidity }% Conditions: { conditions.map(condition => condition.main).join(', ') }
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            { `${maxTemperature}°C / ${minTemperature}°C` }
          </Typography>
        </div>
        <div>
            { this.props.options.remove && (
              <Button onClick={() => this.props.remove() }>
                Remove
              </Button>
            )}
            { this.props.options.remove && (
              <Button onClick={() => this.props.view() }>
                View extended forecast
              </Button>
            )}
        </div>
      </Card>
    );
  }
}

ForecastItem.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(ForecastItem);