export class Forecast {
  constructor(info) {
    console.log(info)
    try {
      this.city = info.location.city;
      this.country = info.location.country_name;
      this.humidity = info.weather.main.humidity;
      this.conditions = info.weather.weather.description;
      this.maxTemperature = info.weather.main.temp_min;
      this.minTemperature = info.weather.main.temp_max;
    } catch (error) {
      console.error('Error creating object', error);
    }
  }
}