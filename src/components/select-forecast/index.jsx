import React from 'react';
import axios from 'axios';
import Async from 'react-select/async';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const baseUrl = "http://localhost:3000/v1"
const endpoint = "/cities"

class SelectForecast extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectOption = this.onSelectOption.bind(this);
    this.getOptionLabel = this.getOptionLabel.bind(this);
    this.getOptionValue = this.getOptionValue.bind(this);
    this.promiseOptions = this.promiseOptions.bind(this);
  }

  getOptionValue(option) {
    return option ? option.name : null;
  }

  // eslint-disable-next-line class-methods-use-this
  getOptionLabel(option) {
    return `${option.name} / ${option.country}`;
  }

  promiseOptions(inputValue) {
    return new Promise((resolve, reject) => {
      if (inputValue.length >= this.props.minSearch) {
        return axios.get(`${baseUrl}${endpoint}`, {
          params: {
            city: inputValue
          }
        }).then(response => resolve(response.data))
          .catch(error => reject(error));
      }
    });
  }

  onSelectOption(option) {
    if (option) {
      this.setState({ selectedCity: option });
    }
  }

  render() {
    return (
      <div className="select-forecast">
        <Async
          className="select"
          cacheOptions
          defaultOptions
          loadOptions={this.promiseOptions}
          isClearable
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          onChange={this.onSelectOption}
          placeholder="Write 3 letters, select city and push accept"
        />
        <Button onClick={()=> this.props.selectOption(this.state.selectedCity)}>Accept</Button>
      </div>
    )
  }
}

SelectForecast.propTypes = {
  selectOption: PropTypes.func.isRequired,
  minSearch: PropTypes.number
}

SelectForecast.defaultProps = {
  minSearch: 3
}

export default SelectForecast