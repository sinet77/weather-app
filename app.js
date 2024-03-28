const apiKey = "32558873493f07b93ba564d0b27a8235";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchButton = document.getElementById('button');
const cityInput = document.getElementById('bar');
const app = document.querySelector('.white-board')

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

    // createHtml(data)
    return data;
}



searchButton.addEventListener('click', async () => {
    const cityName = cityInput.value;
    const weatherObject = await fetchWeatherData(cityName)
    const description = weatherObject.weather[0].description


    console.log(weatherObject) //trzeba zobaczyc wszystkie wlasciwosci, np rodzaje pogody
})

function createHtml(responseData){

    const bar = document.createElement('div');
    bar.classList.add('bar');   //bar ma id
    app.appendChild(bar);

    const inputTextCity = document.createElement('input');
    inputTextCity.classList.add('inputText')
    bar.appendChild(inputTextCity)

    const barContainer = document.createElement('div');
    barContainer.classList.add('barContainer'); //do napisania w css bo tego nie ma
    bar.appendChild(barContainer)

    const searchButton = document.createElement('button');
    searchButton.classList.add('button');  //w css jest button a nie.button
    barContainer.appendChild(searchButton);

    barContainer.addEventListener('click', () =>{
        fetchWeatherData(inputTextCity.value)
    })

    const weatherImg = document.createElement('img');
    weatherImg.classList.add('weatherImg'); //do napisania w css bo tego nie ma
    app.appendChild(weatherImg);


}
