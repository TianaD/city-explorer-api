'use strict' // for eliminating unnecessary javascript jargon

// require library install
require('dotenv').config(); // initializes our environment variables
const express = require('express'); // create an object for the express library
const cors = require('cors'); // create an object for the cors library
// const {response} = require(express);
const data = require('./data/weather.json');
const app = express(); //initialize express app
app.use(cors()); //defines route that responds with json object when GET request is made to root path


//creating api endpoint of weather that processes GET request
app.get('/weather', (request, response) => {
    // setting query parameter 
    let { lat, lon, searchQuery } = request.query;
    // find method searches json file 
    // location = elements within the array (objects) in the weather.json file
    let weatherData = data.find(location => {
        if (lat === location.lat || lon === location.lon || searchQuery === location.city_name) {
            return true;
        } else {
            return false;
        }
    });
    if (weatherData === undefined) {
        return response.status(500).send('Error : data does not exist!')
    }
    let forecastData = weatherData.data.map(dailyForecast => {
        return new Forecast(dailyForecast.valid_date, dailyForecast.weather.description, dailyForecast.high_temp, dailyForecast.low_temp)
    })

    response.send(forecastData)

})


// create an class for Forecast 
class Forecast {
    constructor(date, description, high_temp, low_temp) {
        this.date = date;
        this.description = description;
        this.high_temp = high_temp;
        this.low_temp = low_temp;
    }
}

app.listen(3001)
 console.log("By gum, you've got it!")