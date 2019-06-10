import React from 'react';
import ForecastItem from '../forecast-item';
import PropTypes from 'prop-types';

class ForecastList extends React.Component {

  render() {
    const { forecastList } = this.props;
    console.log(forecastList);
    return forecastList.map((forecast, index) => {
      return <ForecastItem key={`forecast-${index}`} forecast={forecast} />
    });
  }
}

ForecastList.propTypes = {
  forecastList: PropTypes.array
};

ForecastList.defaultProps = {
  forecastList: []
};
export default ForecastList;