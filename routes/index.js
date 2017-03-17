var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var places = require('../api/googlemaps');
var knex = require('../db/db_connection');
var yelp = require('../api/yelp.js').yelp;



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* GET nearby restaurants */
router.get('/places', function(req, res, next) {

    yelp.search({
            term: 'food',
            latitude: req.query.latitude,
            longitude: req.query.longitude,
            radius: 10000,
            id: process.env.APP_ID,
            field: process.env.ACCESS_TOKEN

        })
        .then(function(data) {
            // console.log(data); // print the data returned from the API call
            var jsonString = JSON.stringify(data); // convert data to JSON string
            jsonBussObj = JSON.parse(jsonString).businesses; // Parse JSON string to JSON Object
            console.log(jsonBussObj); // Print each business JSON object
            var l = jsonBussObj.length; // Print length
        })
        .catch(function(err) {
            console.error(err);
        });

    // places.getPlace({
    //         location: `${coords.x},${coords.y}`,
    //         categories: 'restaurant'
    //     })
    //     .then(body => res.json(body))
    //     .catch(err => {
    //       err
    //     })
})


module.exports = router;
