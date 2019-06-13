import React from 'react';
import ForecastItem from '../forecast-item';
import PropTypes from 'prop-types';

class ForecastList extends React.Component {

  render() {
    const { forecastList } = this.props;
    return forecastList.map((forecast, index) => {
      return <ForecastItem key={`forecast-${index}`}
        forecast={forecast}
        remove={() => this.props.remove(index)}
        options={this.props.options}
        view={() => this.props.view(index)}
      />
    });
  }
}

ForecastList.propTypes = {
  forecastList: PropTypes.array,
  remove: PropTypes.func,
  options: PropTypes.shape({
    remove: PropTypes.bool,
    view: PropTypes.bool
  })
};

ForecastList.defaultProps = {
  forecastList: [],
  options: {
    remove: true,
    view: true
  }
};
export default ForecastList;