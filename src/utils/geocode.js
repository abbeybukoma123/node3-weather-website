const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiYWJiZXlsYXZpc2gxIiwiYSI6ImNrOWNmaXcxZTAzYXIzbmwxaXRjYTdjNjcifQ.ZlpWkWslKeZ9w68BDY6NQw&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to the web service!', undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Location added is invalid!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode














// const request = require('request')

// const geocode = (address, callback) => {
//     const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiYWJiZXlsYXZpc2gxIiwiYSI6ImNrOWNmaXcxZTAzYXIzbmwxaXRjYTdjNjcifQ.ZlpWkWslKeZ9w68BDY6NQw&limit=1'

//     request({ url: geocodeURL, json: true}, (error, response) => {
//         if (error){
//             callback('Unable to connect to the web service!', undefined)
//         }
//         else if(response.body.features.length === 0)
//         {
//             callback('Location added is invalid!', undefined)
//         }else{
//             callback(undefined, {
//                 latitude: response.body.features[0].center[0],
//                 longitude: response.body.features[0].center[1],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geocode