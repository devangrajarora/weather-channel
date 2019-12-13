const request = require('request')

const geocode = (address, callback) => { // callback as the following code is asynchronous
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV2YW5nYXJvcmEiLCJhIjoiY2szc2N6ZnlrMDVhNDNvbW4xMXUyMTJpcCJ9.GAbscX1iZFv3tTlldHbTgw&limit=1'
    // encodeURIComponent() convert text string to a url component representation

    request({url, json: true}, (error, response) => {
        if(error) { // we send the error to callback and it can decide what to do with the error -> this makes our function more flexible and reusable 
            callback('Unable to connect to weather services.', undefined)
        } else if(response.body.features.length === 0) { // no results found
            callback('Unable to find location.', undefined);
        } else { 
            const res = response.body.features[0]
            const data = {
                place: res.text,
                location: res.place_name,
                lattitude: res.center[1],
                longitude: res.center[0] 

            }

            callback(undefined, data)
        }
    })
}

module.exports = geocode