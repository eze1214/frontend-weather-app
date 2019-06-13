export class Forecast {
  constructor(id, info) {
    try {
      this.id = id; 
      this.city = info.location.city || info.location.name;
      this.country = info.location.country_name || info.location.country;
      this.humidity = info.weather.humidity;
      this.conditions = info.weather.conditions;
      this.maxTemperature = info.weather.maxTemperature;
      this.minTemperature = info.weather.minTemperature;
      this.temp = info.weather.temp;
    } catch (error) {
      console.error('Error creating object', error);
    }
  }
}