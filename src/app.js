const express = require('express')
const path = require('path')
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//route handler for index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tyler Brown'
    });
})

//route handler for about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tyler Brown'
    })
})
//route handler for help
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Tyler Brown'
    })
})
//route handler for weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
            if(error) {
                return res.send({
                    error: error
                });
            } 
            forecast(longitude,latitude, (forecastError, forecastData) => {
                if(forecastError) {
                    return console.log(forecastError);
                }
                res.send({
                    address: req.query.address,
                    forecast: forecastData, location
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query)
        res.send({
            producs: []
        })
    }
 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help Page Error',
        name: 'Tyler Brown',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Tyler Brown',
        message: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})