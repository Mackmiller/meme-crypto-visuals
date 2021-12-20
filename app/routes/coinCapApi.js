require('dotenv').config()
const express = require('express')

// import axios
const axios = require('axios')

// instantiate a router (mini app that only handles routes)
const router = express.Router()
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

router.get('/', (req, res, next) => {
    axios(config)
        .then(function(response) {
            //console.log('Response data:\n', JSON.stringify(response.data))
            console.log(res.json(response.data))
        })
        .catch(function (error) {
            console.log(error);
        })
        
})

module.exports = router