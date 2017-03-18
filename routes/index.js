var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var places = require('../api/googlemaps');
var knex = require('../db/db_connection');
var yelp = require('../api/yelp');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* GET nearby restaurants */
router.get('/places', function(req, res, next) {

    yelp.getPlace({
            term: 'food',
            latitude: req.query.latitude,
            longitude: req.query.longitude,
            radius: '500'
                // id: process.env.APP_ID,
                // field: process.env.ACCESS_TOKEN
        })
        .then(function(data) {
            res.json(data)
        })
        .catch(function(err) {
            console.error(err);
            next(err)
        });
})


module.exports = router;
