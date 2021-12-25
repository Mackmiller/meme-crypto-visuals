require('dotenv').config()
const express = require('express')
const axios = require('axios')
const router = express.Router()

// GET all meme coins
router.get('/', (req, res) => {
    // config for api call
    var config = {
        method: 'GET',
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=6051a82566fc1b42617d6dc6&limit=10',
        qs: {
            'start': '1',
            'limit': '10',
            'convert': 'USD'
        },
        headers: {
            "X-CMC_PRO_API_KEY": `${process.env.API_KEY}`
        },
        json: true
    }
    axios(config)
        .then(function(response) {
            // entire data object for meme category
            return(res.json(response.data))

            // specifically the coins data within the meme category
            // console.log(res.json(response.data.data.coins))
        })
        .catch(function (error) {
            console.log(error);
        })
        
})

// GET metadata for specific coin (id)
router.get('/cryptocoin/:id', (req, res) => {
    var config = {
        method: 'GET',
        url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${req.params.id}`,
        headers: {
            "X-CMC_PRO_API_KEY": `${process.env.API_KEY}`
        },
        json: true
    }
    // console.log('coin selected: ', req.params.id)
    axios(config)
        .then(function(response) {
            // console.log('This is the individual coin metadata', res.json(response.data))
            return(res.json(response.data))
        })
        .catch(function (error) {
            console.log(error);
        })
        
})

module.exports = router