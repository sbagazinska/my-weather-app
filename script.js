let now = new Date();
let today = document.querySelector("#today");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let time = document.querySelector("#time");
let hours = ("0" + now.getHours()).slice(-2);
let minutes = ('0' + now.getMinutes()).slice(-2);
today.innerHTML = `${day}`;
time.innerHTML = `${hours}:${minutes}`;

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperatureElement.innerHTML = 66;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);


function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;

}

function searchCity(city) {
    let apiKey = "c59a32485cb0c9976a8d0efdab172848";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather)
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    searchCity(city);
}

function searchLocation(position) {
    let apiKey = "c59a32485cb0c9976a8d0efdab172848";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btn-current");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Warsaw");