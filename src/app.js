const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const port = process.env.PORT || 3000
const app = express()

const public = path.join(__dirname, '../public')
const partials = path.join(__dirname, '../partials')

// setup static directory  to serve
app.use(express.static(public)) // express.static() middleware function to serve static files from a directory

// set up handlebars engine
app.set('view engine', 'hbs')
hbs.registerPartials(partials)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Channel',
        name: 'Devang Arora'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Devang Arora'
    })
})

app.get('/weather', (req, res) => {
    if(req.query.location === undefined | req.query.location === '') {
        return res.send({
            error: 'You did not enter any location!'
        })
    }
    const address = req.query.location
    geocode(address, (error, data) => {
        if(error) {
            res.send({error})
        } else {
            forecast(data.lattitude, data.longitude, (error, forecastData = {}) => {
                if(error) {
                    res.send({error}) 
                } else {
                    res.send({
                       place: data.location,
                        weather: forecastData,
                        location: req.query.location
                    })
                }
            })
        }
    })


})

app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Devang Arora'
    })
})

app.listen(port, () => {
    console.log('Server runnning...')
})

