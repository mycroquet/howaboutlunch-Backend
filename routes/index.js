var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var places = require('../api/googlemaps');
var knex = require('../db/db_connection');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* GET nearby restaurants */
router.get('/places', function(req, res, next) {
    let coords = {
        x: req.query.latitude,
        y: req.query.longitude
    }

    places.getPlace({
            location: `${coords.x},${coords.y}`,
            categories: 'restaurant'
        })
        .then(body => res.json(body))
        .catch(err => {
          err
        })
})


module.exports = router;
