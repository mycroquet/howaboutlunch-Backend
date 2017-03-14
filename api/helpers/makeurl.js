const R = require('ramda');

module.exports = (function() {
  const renderQuery = function(obj) {
    if (!obj) {
      return '';
    } else {
      return '&' + R.toPairs(obj)
        .map(pair => pair.map(words => words.replace(' ', '%20')))
        .map(pair => pair.join('='))
        .join('&');
    }
  }

  const makeUrl = function(endpoint, queryObj) {
    if (!queryObj) {
      return endpoint;
    } else {
      return endpoint + renderQuery(queryObj);
    }
  }

  return makeUrl;
})();
