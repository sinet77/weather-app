const apiKey = "32558873493f07b93ba564d0b27a8235";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchButton = document.getElementById('button');
const cityInput = document.querySelector('.bar');
const app = document.querySelector('.white-board')
const container = document.querySelector('.container')
const headline = document.querySelector('.headline')

const temperature = document.querySelector('#temperature')
const humidity = document.querySelector('#humidity')
const pressure = document.querySelector('#pressure')
const wind = document.querySelector('#wind')

const cityName = document.querySelector('#cityName')
const weatherImg = document.querySelector('#weatherImg')
const intro = document.querySelector('#intro')



async function fetchWeatherData(cityName) {
    const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`); //pobrane dane z serwera
    const data = await response.json()

    return data;
}


cityInput.addEventListener('keydown', async function (event) {

    if (event.key === 'Enter') {

        const data = await fetchWeatherData(cityInput.value);
        createHtml(data)

    }
});

searchButton.addEventListener('click', async () => {
    const cityName = cityInput.value;



    if (/^[a-zA-Z]+$/.test(cityName)) {

        const weatherObject = await fetchWeatherData(cityName)
        console.log(weatherObject)

        createHtml(weatherObject)


        app.classList.add('slide-in');
    }
    else {
        alert('Please enter a valid name of the city')
    }

})

function createHtml(responseData) {

    const currentTemperature = responseData.main.temp
    const currentHumidity = responseData.main.humidity
    const currentPressure = responseData.main.pressure
    const currentWind = responseData.wind.speed

    temperature.textContent = kelvinToCelsius(currentTemperature)
    humidity.textContent = currentHumidity
    pressure.textContent = currentPressure
    wind.textContent = currentWind


    cityName.textContent = responseData.name;

    const currentWeatherImg = responseData.weather[0].main;

    weatherImg.alt = currentWeatherImg

    if (currentWeatherImg === 'Clear') {
        weatherImg.src = 'images/clear-day.png'
    }
    if (currentWeatherImg === 'Clouds') {
        weatherImg.src = 'images/cloudy.png'
    }
    if (currentWeatherImg === 'Snow') {
        weatherImg.src = 'images/snow.png'
    }
    if (currentWeatherImg === 'Rain') {
        weatherImg.src = 'images/rain.png'
    }
    if (currentWeatherImg === 'Drizzle') {
        weatherImg.src = 'images/rain.png'
    }
    if (currentWeatherImg === 'Thunderstorm') {
        weatherImg.src = 'images/thunder.png'
    }
    if (currentWeatherImg === 'Mist') {
        weatherImg.src = 'images/fog.png'
    }
    if (currentWeatherImg === 'Fog') {
        weatherImg.src = 'images/fog.png'
    }



    container.classList.remove('hidden')
    intro.classList.add('hidden')
}

function kelvinToCelsius(kelvinTemperature) {
    return Math.ceil(kelvinTemperature - 273.15)
}