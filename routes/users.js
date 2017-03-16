var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* User Login */
router.post('/login', function(req, res, next) {
    if (!req.body.password || req.body.password.length < 5) {
      res.render('buildpoll', {errorMessage: 'Email or password is not valid'});
    }

    var email = req.body.email
    var password = req.body.password

    validLogIn(email, password)
        .then(function(result) {
            if (email == result[0].email && bcrypt.compareSync(password, result[0].password)) {
                setCookie(res, {email: email}).then(function() {
                  let id = req.cookies.dashID
                  res.redirect(`/users/${id}`);
                }).catch(function(err) {
                  res.redirect('/users/guest');
                });
            } else {
                res.redirect('/')
            }
        })
});

module.exports = router;
