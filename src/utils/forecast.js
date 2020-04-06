const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/8c51f1a00a6917da345c9aabac8e8cfc/' + latitude + ',' + longitude + '?units=si';

  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const currentData = body.currently;
      const dayData = body.daily;

      callback(undefined, `${dayData.data[0].summary} It is currently ${currentData.temperature} degrees out. There is a ${currentData.precipProbability}% chance of rain.`);
    }
  })
}

module.exports = forecast;