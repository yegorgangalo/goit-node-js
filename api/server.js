const express = require('express');
const Joi = require('joi');
require('dotenv').config();//підтягує дані з файлу .env в process.env
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env);

app.use(express.json());//обявили даний мідлвеер-прослойку зверху, щоб він відпрацьовував перед усіма запитами на наш сервер
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(addAllowOriginHeader);
app.options('*', addCorsHeaders)

app.get("/weather", validateWeatherQueryParams, getWeather);

app.listen(PORT, () => {
    console.log("starting listening on port", PORT);
})

function validateWeatherQueryParams(req, res, next) {
    const weatherRules = Joi.object({
        lat: Joi.string().required(),
        lon: Joi.string().required()
    });

    const {error} = weatherRules.validate(req.query);

    if (error) {
        return res.status(400).send(error.message);
    }

    next();
}

async function getWeather(req, res, next) {
    const { lat, lon } = req.query;

    const response = await fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_SECRET_KEY}/${lat},${lon}?exclude=hourly,minutely,daily`);
    const responseBody = await response.json();

    if (responseBody.error) {
        return res.status(responseBody.code).send(responseBody.error);
    }

    // console.log('responseBody', responseBody);
    return res.status(200).send(responseBody);
}

function addAllowOriginHeader(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
}

function addCorsHeaders(req, res, next) {
    res.set('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    res.status(200).send();
}