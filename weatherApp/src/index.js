let now = new Date();
let year = now.getFullYear();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let month = months[now.getMonth()];
let currentDateInfo = document.querySelector("#currentTime");

currentDateInfo.innerHTML = `as of ${hour}:${minutes} ${month}/${date}/${year}`;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//search conditions
let apiKey = "8b6dc570eaf7977950b59213d0d0ca0b";
let apiWeatherBase = `https://api.openweathermap.org/data/2.5/weather?`;

function showWeather(response) {
  let enterCity = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = enterCity;

  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${currentTemp}°`;

  let lowCurrentTemp = Math.round(response.data.main.temp_min);
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `${lowCurrentTemp}°`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Windspeed: ${wind}`;

  let description = response.data.weather[0].main;
  let currentWeatherDescription = document.querySelector(
    "#weather-description"
  );
  currentWeatherDescription.innerHTML = description;
}

function searchCity(inputCity) {
  let units = "imperial";
  let apiUrl = `${apiWeatherBase}q=${inputCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showData(event) {
  event.preventDefault();
  let searchResultCity = document.querySelector("#search-input").value;
  searchCity(searchResultCity);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "imperial";
  let apiLocation = `${apiWeatherBase}lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  axios.get(apiLocation).then(showWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let activateSearch = document.querySelector("#city-search");
activateSearch.addEventListener("submit", showData);

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", showCurrentLocation);
