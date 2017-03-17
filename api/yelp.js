// Request API access: http://www.yelp.com/developers/getting_started/api_access
require('dotenv').config();
const request = require("request");
const makeURL = require("./helpers/makeurl")
const Yelp = require('yelp');

const ENDPOINT = 'https://api.yelp.com/v3/businesses/search?'

var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
  client_id: process.env.APP_ID,
  client_token: process.env.APP_SECRET,
  access_token: process.env.ACCESS_TOKEN
});
console.log(process.env.ACCESS_TOKEN);



function filterInfo(obj) {
    return obj.results.map(function (place){

      console.log(place);
      return {
        name: place.name,
        image_url: place.image_url,
        url: place.url,
        categories: place.categories.title,
        distance: place.distance,
        address: place.location.display_address,
        phone: place.phone,
        price: place.price,
        rating: place.rating,
        is_closed: place.is_closed,
        id: place.id
      }
    })
}


const getPlace = function(queryObj)    {
      let url = makeURL(ENDPOINT, queryObj);
      // let url = `${ENDPOINT}&location=${queryObj.location}&radius=${queryObj.radius}&term=${queryObj.term}`

      console.log(url);
        return new Promise(function(resolve, reject)   {
            request({
              url,
              headers: {
                Authorization: "Bearer " + process.env.ACCESS_TOKEN
              }
            }, function(err, res, body)   {
                if (!err)   {
                  resolve(JSON.parse(body))
                    //resolve(filterInfo(JSON.parse(body)));
                }   else    {
                    reject(err)
                }
            })
        })
    }

module.exports = {
  getPlace, yelp
}
