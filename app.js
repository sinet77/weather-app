const apiKey = "32558873493f07b93ba564d0b27a8235";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchButton = document.getElementById('button');
const cityInput = document.getElementById('bar');

// if(!city){
//     alert ("Please enter the city");
//     return;
// }



async function fetchWeatherData(cityName) {
    const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`); //pobrane dane z serwera
    console.log(response)
    if (!response.ok) {
        alert("City not found")
    }
    const data = await response.json()
    return data;
}



searchButton.addEventListener('click', async () => {
    const cityName = cityInput.value;
    const weatherObject = await fetchWeatherData(cityName)
    const description = weatherObject.weather[0].description
    console.log(description)
})


