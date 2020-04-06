// core module
const path = require('path');

// 3rd party module
const express = require('express');
const hbs = require('hbs');

// custom modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Shantanu Patel'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Shantanu Patel'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is help message for you.',
    title: 'Help',
    name: 'Shantanu Patel'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error: error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        forecast: forecastData, 
        location: location,
        address: address
      });
    })
  });
});

app.get('/products', (req, res) => {
  const reqQuery = req.query;
  console.log(reqQuery);
  res.send(reqQuery);
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    errorMessage: 'Help article not found',
    name: 'Shantanu Patel'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    errorMessage: 'Page not found',
    name: 'Shantanu Patel'
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));