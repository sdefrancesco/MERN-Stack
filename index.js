const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//  Connect to MongoDB
mongoose.connect('mongodb://localhost/testuser', {
    useNewUrlParser: true
}) 
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected To Db..')
})

//OTHER MONGOOSE BULLCRAP
mongoose.set('useFindAndModify', false);

//  Import Routes
const api = require('./routes/api.js')
const users = require('./routes/users.js')
const items = require('./routes/item.js')

//  Call Express function so we can create ur paths and webserver
const app = express()

//  Template engine
app.set('view engine', 'hbs')
//  Set Default Layout
app.set('view options', {
    layout: './layouts/product.hbs',
})
//  Serve static files
app.use(express.static('public'))

//  Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Routes (imported)
app.use('/api', api) // API (mainly for ajax requests)
app.use('/users', users) // USER Routes
app.use('/items', items) // Item Routes

// index routes 
app.get('/', (req, res) => {
    res.send('home-page')
})

//  web server handled by express
app.listen(port, () => {
    console.log('server started on port 3000')
})

