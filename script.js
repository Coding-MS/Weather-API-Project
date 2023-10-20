// Get the API key from OpenWeathermap 
const apiKey = "f3250885431f58878f508fbb70480058"

//Select the DOM Elements 
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

// Eventlistener for search button
searchBtn.addEventListener('click', async function () {
    const city = cityInput.value;
    const coordinates = await fetchCoordinates(city);
    fetchWeather(coordinates.lat, coordinates.lon);
})
// function to get weather coordinates using the api 
async function fetchCoordinates(city) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    const [data] = await response.json();
    if (data) {
        return { lat: data.lat, lon: data.lon }
    } else {
        return nulll;
    }
}

//function to get weather at a set of coordinates 
async function fetchWeather(lat, lon ){
    const response = await fetch ('const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);')
    const data = await response.json(); 

    if (data.cod === 200) {
        weatherInfo.innerHTML = `
        <h2> ${data.name}, ${data.sys.country} </h2>
        <p> ${data.weather[0].description}</p>
        <p> Temperature: ${data.main.temp} C </p>
        `; 
    } else {
        weatherInfo.innerHTML = "<p> City not found </p>"; 
    }
}