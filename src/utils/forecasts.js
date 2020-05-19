const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +'&APPID=4a49cffd31129811db54220a751573bd'
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to the web service!', undefined)
        }
        else if(body.error){
            callback('Geo-points added are invalid', undefined)
        }else{
            callback(undefined, ' It is currently ' + body.main.temp + ' degrees out. There is '+ body.main.humidity + '% chance of rain! with a wind speed of ' + body.wind.speed) 
        }
    })
}
//body.weather[0].description +
module.exports = forecast

















// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude +'&appid={9c2a3d4d8b6499bb326055ccad4ba615}'

//     request({ url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to the web service!', undefined)
//         }
//         else if(response.body.error){
//             callback('Geo-points added are invalid', undefined)
//         }else{
//             callback(undefined, console.log(response.body.daily[0].data[0].summary + ' is currently ' + response.body.currently.temperature + ' degrees. There is '+ response.body.currently.precipProbability + '% chance of rain!'))
//         }
//     })
// }

// module.exports = forecast
