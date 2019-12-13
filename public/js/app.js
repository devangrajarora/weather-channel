const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const locationBox = document.querySelector('#location')
const weatherBox = document.querySelector('#weather')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // prevents default behaviour of refreshing the page when form is submitted
    const location = input.value // get the search term
    weatherBox.textContent = ''
    locationBox.textContent = 'Loading results...'
    const url = '/weather?location=' + encodeURIComponent(location)
    fetch(url).then((response) => {
        
        response.json().then((data) => { // fetched json data parsed to js object
            if(data.error) {
                locationBox.textContent = data.error
                weatherBox.textContent = ''
            } else {
                locationBox.textContent = 'Location: ' + data.place
                weatherBox.textContent = data.weather
            }
        })
    })
})