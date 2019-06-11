export class Forecast {
  constructor(id, info) {
    console.log(info)
    try {
      this.id = id; 
      this.city = info.location.city || info.location.name;
      this.country = info.location.country_name || info.location.country;
      this.humidity = info.weather.main.humidity;
      this.conditions = info.weather.weather.description;
      this.maxTemperature = info.weather.main.temp_min;
      this.minTemperature = info.weather.main.temp_max;
    } catch (error) {
      console.error('Error creating object', error);
    }
  }
}