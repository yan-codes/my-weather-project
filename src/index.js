function displayTime(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  } else {
    hours = `${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = `${minutes}`;
  }

  let day = days[now.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

let time = document.querySelector("#time");
time.innerHTML = displayTime(new Date());

function showData(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let h1 = document.querySelector("#cityName");
  h1.innerHTML = `${city}`;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${temperature}`;
  let weatherDescrip = document.querySelector("#weather-description");
  weatherDescrip.innerHTML = `${description}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${wind}km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-text-input").value;
  let apiKey = "5fbf29be988a6f0d497691f9466d6598";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

function showHome(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5fbf29be988a6f0d497691f9466d6598";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5fbf29be988a6f0d497691f9466d6598&units=metric`;

  axios.get(apiUrl).then(showData);
}
let currentButton = document.querySelector("#current-loc-btn");
currentButton.addEventListener("click", showHome);
