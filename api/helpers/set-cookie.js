const userModel = require('../../model/user');
const R = require('ramda');

module.exports = function setCookie(res, userObj) {
  return new Promise(function(resolve, reject) {
    let tenYearsMilli = 315569260000;
    let options = {
      maxAge: tenYearsMilli
    };
    if (!userObj.email && !userObj.id) {
      reject(new Error('You done fucked up!'));
    } else {
      if (!userObj.id) {
        userModel.getUserByUsername(userObj.email).then(function(user) {
          res.cookie('userID', user.id);
          let cookie =
          resolve(true);
        })
      } else {
        res.cookie('userID', userObj.userID);
        resolve(true);
      }
    }
  });
}
