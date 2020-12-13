const express = require('express')
const path = require('path')
const hbs = require('hbs');
const app = express();

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
    res.send({
        forecast: 'HOT',
        location: 'Somewhere'
    })
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