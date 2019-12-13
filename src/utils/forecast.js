const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/5a3e094b60d6c2ca1fa5bd420ab4b756/' + lattitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather services.', undefined)
        } else if(response.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const res = response.body
            const data = {
                summary: res.daily.data[0].summary,
                temperature: res.currently.temperature,
                precipProbability: res.currently.precipProbability,
                minTemp: res.daily.data[0].temperatureMin,
                maxTemp: res.daily.data[0].temperatureMax
            }

            const info = `${data.summary} Current Temperature is ${data.temperature}°C and Probability of Precipitation is ${data.precipProbability}%. Minimum Temperature today will be ${data.minTemp}°C and Max Temperature will be ${data.maxTemp}°C`
            callback(undefined, info)
        }
    })
}

module.exports = forecast