// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for favorites
const Favorite = require('../models/favorite')
const User = require('../models/user')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { favorite: { title: '', text: 'foo' } } -> { favorite: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()


// CREATE
// POST /favorites
router.post('/favorites', requireToken, (req, res, next) => {
	// set owner of new favorite to be current user
	// console.log("this is req.user:". req.user)
	req.body.favorite.userId = req.user.id

	Favorite.create(req.body.favorite)
		// respond to succesful `create` with status 201 and JSON of new "favorite"
		.then((favorite) => {
			res.status(201).json({ favorite: favorite.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// INDEX
// GET /favorites
router.get('/favorites/user/:userId', (req, res, next) => {
	Favorite.find({ 'userId': req.params.userId })
		.then(handle404)
		// respond with status 200 and JSON of the profiles
		// .then((favorites) => {
		// 	return favorites.map((favorite) => favorite.toObject())
		// })
		.then((favorites) => res.status(200).json({ favorites: favorites}))
		// if an error occurs, pass it to the handler
		.catch(next)
	})


// DESTROY
// DELETE one from /favorites
router.delete('/favorites/user/:userId', requireToken, (req, res, next) => {
	req.body.favorite.userId = req.user.id

	Favorite.deleteOne(req.body.favorite)
		// respond to succesful `create` with status 201 and JSON of new "favorite"
		.then((favorite) => {
			res.sendStatus(204)
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

module.exports = router
