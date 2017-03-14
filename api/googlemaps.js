const request = require("request");
const makeURL = require("./helpers/makeurl")


const ENDPOINT = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCfG4Uy52CfTU8uz0A5k95RrZya5jZb_ME`;

  function filterInfo(obj) {
      return obj.results.map(function (place){
        return {
          name: place.name,
          address: place.vicinity,
          location: place.geometry.location,
          icon: place.icon,
          placeId: place.place_id
        }
        console.log('HELLO');
      })
  }


  const getPlace = function(queryObj)    {
        let url = makeURL(ENDPOINT, queryObj);
        // let url = `${ENDPOINT}&location=${queryObj.location}&radius=${queryObj.radius}&type=${queryObj.type}`

        console.log(url);
          return new Promise(function(resolve, reject)   {
              request(url, function(err, res, body)   {
                  if (!err)   {
                    //resolve(JSON.parse(body))
                      resolve(filterInfo(JSON.parse(body)));
                  }   else    {
                      reject(err)
                  }
              })
          })
      }

  module.exports = {
    getPlace
  }
