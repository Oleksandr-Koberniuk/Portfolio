const searchButton = document.querySelector('.js-search-button');
let unit;

function searchWeather() {
    const city = document.querySelector('.js-city-input').value;
    const apiKey = 'de8839c515e63c58374222f2fdefa8c2';
    let response;
    let data;
    let temperature;

    async function getWeatherData() {
        if (city === '') {
            document.querySelector('.js-city-input').classList.add('no-input');
            return;
        }

        document.querySelector('.js-weather-display').classList.remove('weather-display');
        document.querySelector('.js-weather-display').classList.add('flex-column');

        try {
            response = await fetch (`
                https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}
            `)     
            data = await response.json();
            
            if (data.cod !== 200) {
                if (data.cod === '404') {
                    document.querySelector('.js-header').textContent = 'Location Not Found!';
                } else {
                    document.querySelector('.js-header').textContent = 'Unexpected error! Please try again later';
                } 
                return;
            }

        } catch(error) {
            document.querySelector('.js-header').textContent = 'Unexpected error! Please try again later';
            return;     
        }
        
        if (!unit) {
            document.querySelector('.js-unit-text').style.color = 'red';
            return;
        }

        if (unit === 'metric') {
            temperature = `${(data.main.temp - 273.15).toFixed(2)}°C`;
        } else if (unit === 'imperial') {
            temperature = `${((data.main.temp * 1.8) - 459.67).toFixed(2)}°F`;
        } 

        const weatherIcons = {
            2: '11d',
            3: '09d',
            5: '10d',
            6: '13d',
            7: '50d',
            800: '01d',
            801: '02d',
            802: '03d',
            803: '04d',
            804: '04d'
        };

        let weatherId = data.weather[0].id;
        
        function getWeatherIcon(weatherId) {
            if (weatherId === 511) {
                return '13d';
            }

            if (weatherId >= 520 && weatherId <= 531) {
                return '09d';
            }

            if (weatherIcons[weatherId]) {
                return weatherIcons[weatherId];
            }
            const prefix = Math.floor(weatherId / 100);
            return weatherIcons[prefix];
        }

        document.querySelector('.js-header').textContent = data.name;
        document.querySelector('.js-weather-image').src = `https://openweathermap.org/img/wn/${getWeatherIcon(weatherId)}@4x.png`;
        document.querySelector('.js-temperature').textContent = temperature;
        document.querySelector('.js-details').textContent = data.weather[0].description;
        document.querySelector('.js-humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.querySelector('.js-wind').textContent = `Wind: ${data.wind.speed}km/h`;
    }
    getWeatherData();
}

document.querySelector('.js-metric-unit').addEventListener('click', () => {
    unit = 'metric';   
    document.querySelector('.js-unit-text').style.color = 'white';
    document.querySelector('.js-unit-metric').classList.add('unit-active');
    document.querySelector('.js-unit-imperial').classList.remove('unit-active');
    searchWeather();
});
document.querySelector('.js-imperial-unit').addEventListener('click', () => {
    unit = 'imperial'
    document.querySelector('.js-unit-text').style.color = 'white';
    document.querySelector('.js-unit-imperial').classList.add('unit-active');
    document.querySelector('.js-unit-metric').classList.remove('unit-active');
    searchWeather();
});

document.querySelector('.js-search-button').addEventListener('click', searchWeather);
document.querySelector('.js-city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});