// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//coincap api
const coincap = require('./app/routes/coinCapApi')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 8000
const clientDevPort = 3000

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
	useNewUrlParser: true,
})
// Connection string for Atlas MongoDb cloud
mongoose.connection.once('open', () => {
	console.log(`Connected to MongoDb at ${mongoose.connection.host}:${mongoose.connection.port}`)
})
// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
// app.use(
// 	cors()
// )
app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
	})
)

// define port for API to run on
// adding PORT= to your env file will be necessary for deployment
const port = process.env.PORT || serverDevPort

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// coin cap routes
app.use(coincap)

// run API on designated port
app.listen(port, () => {
	console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
