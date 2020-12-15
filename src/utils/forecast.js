const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1ae7908cf9b52ae3a833554406a21481&query=' + encodeURIComponent(longitude) + ','+ encodeURIComponent(latitude) +'&units=f'
    request({url, json: true}, (error, {body}) =>{
    if(error) {
        callback('Unable to connect to location services.');
    } else if (body.error) {
        callback('Unable to find location.');
    } else {
       // console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ', but it feels like ' + response.body.current.feelslike + ' degrees out.');
       callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' +body.current.temperature + 'degrees out, but it feels like ' + body.current.feelslike + ' degrees out.' + 
       "The humidity out is currently " + body.current.humidity + "%.");
    }
})
}

module.exports = forecast