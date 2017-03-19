const userModel = require('../../model/user');
const R = require('ramda');

module.exports = function setCookie(res, userObj) {
  return new Promise(function(resolve, reject) {
    let tenYearsMilli = 315569260000;
    let options = {
      maxAge: tenYearsMilli
    };
    if (!userObj.dashUsername && !userObj.dashId) {
      reject(new Error('setCookie must take an object with either a dashUsername or dashId!'));
    } else {
      if (!userObj.dashId) {
        userModel.getUserByUsername(userObj.dashUsername).then(function(user) {
          res.cookie('dashId', user.id);
          let cookie =
          resolve(true);
        })
      } else {
        res.cookie('dashId', userObj.dashId);
        resolve(true);
      }
    }
  });
}
