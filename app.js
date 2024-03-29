const apiKey = "32558873493f07b93ba564d0b27a8235";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchButton = document.getElementById('button');
const cityInput = document.querySelector('.bar');
const app = document.querySelector('.white-board')


// if(!city){
//     alert ("Please enter the city");
//     return;
// }

let lastCityName = ''

async function fetchWeatherData(cityName) {
    const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`); //pobrane dane z serwera
    console.log(response)
    // if (!response.ok) {
    //     alert("City not found")
    // }
    const data = await response.json()

    app.innerHTML = '';
    lastCityName = cityName;

    createHtml(data)
    return data;
}



searchButton.addEventListener('click', async () => {
    const cityName = cityInput.value;
    const weatherObject = await fetchWeatherData(cityName)

    console.log(weatherObject) //trzeba zobaczyc wszystkie wlasciwosci, np rodzaje pogody
})

function createHtml(responseData){
    const container = document.createElement('div')
    container.classList.add('container')
    app.appendChild(container)

    const nameOfTheCity = document.createElement('div')
    nameOfTheCity.classList.add('title')
    nameOfTheCity.textContent = responseData.name;
    container.appendChild(nameOfTheCity)
    
    const weatherImg = document.createElement('img');
    weatherImg.classList.add('weatherImg'); //do napisania w css bo tego nie ma
    container.appendChild(weatherImg);

    const temperature = document.createElement('div')
    temperature.classList.add('temperature')
    container.appendChild(temperature)

    let currentTemperature = responseData.main.temp
    temperature.textContent = currentTemperature

    const humidity = document.createElement('div')
    humidity.classList.add('humidity')
    container.appendChild(humidity)

    let currentHumidity = responseData.main.humidity
    humidity.textContent = currentHumidity

    const pressure = document.createElement('div')
    pressure.classList.add('pressure')
    container.appendChild(pressure)

    let currentPressure = responseData.main.pressure
    pressure.textContent = currentPressure

    const wind = document.createElement('div')
    wind.classList.add('wind')
    container.appendChild(wind)

    let currentWind = responseData.wind.speed
    wind.textContent = currentWind


    const bar = document.createElement('div');
    bar.classList.add('bar');
    app.appendChild(bar);

    const inputTextCity = document.createElement('input');
    inputTextCity.classList.add('barAgain')
    inputTextCity.setAttribute('placeholder', 'Enter city'); 
    bar.appendChild(inputTextCity)


    const searchButton = document.createElement('button');
    searchButton.classList.add('buttonAgain');  
    searchButton.textContent = "Search again"
    app.appendChild(searchButton);

    searchButton.addEventListener('click', () =>{
        fetchWeatherData(inputTextCity.value)
    })



    let currentWeatherImg = responseData.weather[0].main;
    console.log(currentWeatherImg)

    if(currentWeatherImg === 'Clear'){   
        weatherImg.src = 'images/clear-day.png'
    }
    if(currentWeatherImg === 'Clouds'){   
        weatherImg.src = 'images/cloudy.png'
    }
    if(currentWeatherImg === 'Snow'){   
        weatherImg.src = 'images/snow.png'
    }
    if(currentWeatherImg === 'Rain'){   
        weatherImg.src = 'images/rain.png'
    }
    if(currentWeatherImg === 'Drizzle'){   
        weatherImg.src = 'images/rain.png'
    }
    if(currentWeatherImg === 'Thunderstorm'){   
        weatherImg.src = 'images/thunder.png'
    }
    if(currentWeatherImg === 'Mist'){   
        weatherImg.src = 'images/fog.png'
    }
    if(currentWeatherImg === 'Fog'){   
        weatherImg.src = 'images/fog.png'
    }



    
}



