var express = require('express');
var knex = require('../db/db_connection');
var router = express.Router();
var bodyParser = require('body-parser');
var setCookie = require('../api/helpers/set-cookie.js');
var userModel = require('../model/user');
var bcrypt = require('bcrypt');
var places = require('../api/googlemaps');
var yelp = require('../api/yelp');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

/* User Login */
router.post('/login', function(req, res, next) {
    if (!req.body.password || req.body.password.length < 4) {
        return res.json({errorMessage: 'Email or password is not valid'});
      }

    var email = req.body.email
    var password = req.body.password

    userModel.validLogIn(email, password)
        .then(function(result) {
            console.log(result);
            if (email == result[0].email && bcrypt.compareSync(password, result[0].password)) {
                setCookie(res, {
                    email: email
                }).then(function() {
                    let id = req.cookies.userID
                    console.log(id);
                    res.redirect(`/users/${id}`);
                }).catch(function(err) {
                   res.redirect('home');
                });
            } else {
                res.redirect('/')
            }
        })
});

router.get('/logout', function(req, res, next) {
    res.clearCookie('userId')
    res.redirect('/')
})

/* GET nearby restaurants */
router.get('/places', function(req, res, next) {

    yelp.getPlace({
            term: 'food',
            latitude: req.query.latitude,
            longitude: req.query.longitude,
            radius: '500'
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
