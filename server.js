'use strict' // for eliminating unnecessary javascript jargon
const cityInput = require('./weather')
// require library install
require('dotenv').config(); // initializes our environment variables
const express = require('express'); // create an object for the express library
const cors = require('cors'); // create an object for the cors library
// const {response} = require(express);
const axios = require('axios');
const data = require('./data/weather.json');
const movieInput = require('./movie');
const app = express(); //initialize express app
const NodeCache = require('node-cache');
app.use(cors()); //defines route that responds with json object when GET request is made to root path
const weatherCache = new NodeCache();
const movieCache = new NodeCache();



// creating api endpoint of weather that processes GET request
// get method returns a promise - a value that has not been determined yet; promise has three methods : then (accepts the function we want to run when we get the response back), catch(), finally()
app.get('/weather', async (request, response) => {
    // pass in url I want to send request to 
    let { lat, lon } = request.query;
    let forecastData = await cityInput(lat, lon)
    // console.log(data)
    response.send(forecastData)
    console.log(forecastData);

})

app.get('/movies', async (request, response) => {
    let {lat, lon} = request.query
    let movieData = await movieInput(request.query.movie)
    response.send(movieData)
})

app.listen(3001)
console.log("By gum, you've got it!")
