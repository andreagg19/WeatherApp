document.getElementById('fetch-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDetails = document.getElementById('weather-details');

    if (city) {
        fetch(`http://api.weatherstack.com/current?access_key=53746ba886546fa5b76f11b53f6a8d9a&query=${city}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error('City not found');
                }
                weatherIcon.innerHTML = `<img src="${data.current.weather_icons[0]}" alt="Weather Icon">`;
                weatherDetails.innerHTML = `
                    <h2>${data.location.name}</h2>
                    <p>Temperature: ${data.current.temperature} °C</p>
                    <p>Weather: ${data.current.weather_descriptions[0]}</p>
                `;
            })
            .catch(error => {
                weatherIcon.innerHTML = ''; 
                weatherDetails.innerHTML = `<p style="color:red">${error.message}</p>`;
            });
    } else {
        weatherIcon.innerHTML = '';
        weatherDetails.innerHTML = '<p style="color:red">Please enter a city name</p>';
    }
});
