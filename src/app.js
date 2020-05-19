const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecasts.js')

const app = express() 
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup Dynamic routes to render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'RealTech Ltd'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'RealTech Ltd'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Help us stop the spread of COVID19 by staying home and washing your hands regularly',
        name: 'RealTech Ltd'
    })
})

//Sending using info using an object                              
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            } 

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            })
        })
    })


})

// app.get('/products', (req, res) =>{
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

//Help article not found page
app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: 'Help',
        errorMessage: 'Help article not found',
        name: 'RealTech Ltd'
    })
})


//For 404 Error Page
app.get('*', (req, res) => {
    res.render('404error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'RealTech Ltd'
    })
})


//To start the server up
app.listen(port, () => {            
    console.log('Server is up on port '+ port)
})          



























// //Load in express library
// const express = require('express') //Express library exposes just a single function unlike it being an object

// const app = express()   //We call the express function to create a new express-application

// //---Tell the express app what exactly it should do
// //How we set up the server to get something at a specific route/page.. ''- homepage, 'help' - helppage
// app.get('', (req, res) => {         //.GET() lets us configure what the server shd do when someone tries to get the resource at a specific url
//     res.send('Hello express!')      //The callback function describes what the server will do when some visits this specific page/route decribed in the '' argument in the get(). req - request given to the server, res - response the server gives
// })                                  

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('About page')
// })

// app.get('/weather', (req, res) => {
//     res.send('Show weather')
// })
// //---We have one domain that sets up our server with different routes to different pages e.g. help, about
// //app.com
// //app.com/help
// //app.com/about

// //To start the server up
// app.listen(3000, () => {            ////has it listen on a specific port (3000) - is a common development-port
//     console.log('Server is up on port 3000')
// })          