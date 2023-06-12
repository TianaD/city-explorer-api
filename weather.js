const axios = require('axios');
const NodeCache = require('node-cache');
const movieInput = require('./movie');
const cache = new NodeCache();
const cacheKey = `${movieInput}`;
const cacheData = cache.get(cacheKey)

if (cacheData !== undefined) {
    res.send(cacheData)
} else {
    async function cityInput(lat, lon) {
        let response = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)
        const forecastData = response.data.data.slice(0, 3).map(dailyForecastObject => {
            return new Forecast(dailyForecastObject.valid_date, dailyForecastObject.weather.description, dailyForecastObject.high_temp, dailyForecastObject.low_temp)
        })
        cache.set(cacheKey, forecastData, 40000);
        return forecastData

    }
}



// create an class for Forecast 
class Forecast {
    constructor(date, description, high_temp, low_temp) {
        this.date = date;
        this.description = description;
        this.high_temp = high_temp;
        this.low_temp = low_temp;
    }
}

module.exports = cityInput



