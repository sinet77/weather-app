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
const together = document.querySelector('.together')

app.classList.add('slide-in');

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

        createHtml(weatherObject)



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

    temperature.textContent = `${kelvinToCelsius(currentTemperature)}°C`
    humidity.textContent = `${currentHumidity}%`
    pressure.textContent = `${currentPressure} hPa`
    wind.textContent = `${currentWind} m/s`


    cityName.textContent = responseData.name;

    const currentWeatherImg = responseData.weather[0].main;

    weatherImg.alt = currentWeatherImg



    if (currentWeatherImg === 'Clear') {
    }
    if (currentWeatherImg === 'Clouds') {
    }
    if (currentWeatherImg === 'Snow') {
    }
    if (currentWeatherImg === 'Rain') {
    }
    if (currentWeatherImg === 'Drizzle') {
    }
    if (currentWeatherImg === 'Thunderstorm') {
    }
    if (currentWeatherImg === 'Mist') {
    }
    if (currentWeatherImg === 'Fog') {

    }

    weatherImg.src = `images/${currentWeatherImg}.png`

    container.classList.remove('hidden')
    intro.classList.add('hidden')
    together.classList.remove('zoom-in');
    together.offsetWidth;
    together.classList.add('zoom-in');

}

function kelvinToCelsius(kelvinTemperature) {
    return Math.ceil(kelvinTemperature - 273.15)
}