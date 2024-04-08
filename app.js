const apiKey = "32558873493f07b93ba564d0b27a8235";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchButton = document.getElementById('button');
const cityInput = document.querySelector('.bar');
const app = document.querySelector('.white-board')
const container = document.querySelector('.container')
const headline = document.querySelector('.headline')

const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const pressure = document.querySelector('.pressure')
const wind = document.querySelector('.wind')


// if(!city){
//     alert ("Please enter the city");
//     return;
// }

let lastCityName = ''


async function fetchWeatherData(cityName) {
    const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`); //pobrane dane z serwera
    const data = await response.json()


    // app.innerHTML = ''
    lastCityName = cityName;


    return data;
}

cityInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        fetchWeatherData(cityInput.value);
    }
});

searchButton.addEventListener('click', async () => {
    const cityName = cityInput.value;



    if (/^[a-zA-Z]+$/.test(cityName)) {

        const weatherObject = await fetchWeatherData(cityName)

        createHtml(weatherObject)


        app.classList.add('slide-in');
    }
    else {
        alert('Please enter a valid name of the city')
    }

})

function createHtml(responseData) {

    container.innerHTML = '';


    let currentTemperature = responseData.main.temp
    let currentHumidity = responseData.main.humidity
    let currentPressure = responseData.main.pressure
    let currentWind = responseData.wind.speed

    const nameOfTheCity = document.createElement('div')
    nameOfTheCity.classList.add('cityName')
    nameOfTheCity.textContent = responseData.name;
    app.appendChild(nameOfTheCity)

    const weatherImg = document.createElement('img');
    weatherImg.classList.add('weatherImg'); //do napisania w css bo tego nie ma
    app.appendChild(weatherImg);

    const temperatureBox = document.createElement('div');
    temperatureBox.classList.add('temperature', 'box');
    temperatureBox.textContent = `Temperature: +${kelvinToCelsius(currentTemperature)}°C`;

    const humidityBox = document.createElement('div');
    humidityBox.classList.add('humidity', 'box');
    humidityBox.textContent = `Humidity: ${currentHumidity}%`;

    const pressureBox = document.createElement('div');
    pressureBox.classList.add('pressure', 'box');
    pressureBox.textContent = `Pressure: ${currentPressure} hPa`;

    const windBox = document.createElement('div');
    windBox.classList.add('wind', 'box');
    windBox.textContent = `Wind speed: ${currentWind} m/s`;

    container.appendChild(temperatureBox);
    container.appendChild(humidityBox);
    container.appendChild(pressureBox);
    container.appendChild(windBox);

    // const bar = document.createElement('div');
    // bar.classList.add('bar');
    // app.appendChild(bar);

    // const inputTextCity = document.createElement('input');
    // inputTextCity.classList.add('barAgain')
    // inputTextCity.setAttribute('placeholder', 'Enter city');
    // bar.appendChild(inputTextCity)

    // inputTextCity.addEventListener('keydown', function (event) {
    //     if (event.key === 'Enter') {
    //         fetchWeatherData(inputTextCity.value);
    //     }
    // });


    // searchButtonAgain.addEventListener('click', () => {
    //     if (/^[a-zA-Z]+$/.test(inputTextCity.value)) {  //&& responseData.contains(inputTextCity.value) ?????????????????
    //         fetchWeatherData(inputTextCity.value)
    //         app.classList.remove('zoom-in')
    //         app.offsetWidth; //wymuszenie ponownego przeliczenia stylów elementu, przez co resetuje sie animacja
    //         app.classList.remove('slide-in')
    //         app.classList.add('zoom-in')

    //     } else {
    //         alert('Please enter a valid name of the city')
    //     }


    // })



    let currentWeatherImg = responseData.weather[0].main;


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



    container.classList.remove('hidden');
}

function kelvinToCelsius(kelvinTemperature) {
    return Math.ceil(kelvinTemperature - 273.15)
}