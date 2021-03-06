var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var userModel = require('../model/user');
var user = require('../model/user');
var setCookie = require('../api/helpers/set-cookie');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {
    console.log('Inside User route');
    userModel.userProfile(req.body.email).then(function(result) {
        res.json(result)
    })
});

/* GET user info for Profile */
router.get('/profile/:id', function(req, res, next) {
  console.log(req.params.id);
    userModel.userProfile(req.params.id)
        .then(function(email) {

            userModel.userProfile(user.email)
                .then(function(results) {
                    res.json({
                        userInfo: results
                    })
                })
        })
});


/* Create User */
router.post('/signup', function(req, res, next) {
        var userInfo = {
            email: req.user.email,
            password: bcrypt.hashSync(req.user.password, 10)
        }

        user.createUser(userInfo)
            .then(function(result) {
                var userId = result[0];
                delete userInfo.password

                setCookie(res, {
                    profileId: userId
                }).then(function() {
                    res.status(200).json({
                        userId,
                        message: 'User created!'
                    })
                })
            })
            .catch(function(err) {
                if (err.constraint === "user_email_unique") {
                    res.status(500).send({
                        message: 'Email exists already!'
                    })
                } else {
                    res.status(500).send({
                        message: err.constraint
                    })
                }
            })
})


module.exports = router;
