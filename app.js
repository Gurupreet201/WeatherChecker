// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi = {
  key: "396d9dc65747c8ef03cce973fb71177a",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");

// Add Event Listener Function on Keypress
searchInputBox.addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-body").style.display = "block";
  }
});

// Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}
// Show Weather Report
function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.getElementById("temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let maxmin = document.getElementById("min-max");
  maxmin.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

  let weatherType = document.getElementById("weather");
  weatherType.innerHTML = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerHTML = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url(clear.jpg)";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url(cloudy.jpg)";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url(haze.jpg)";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url(rain.jpg)";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url(snow.jpg)";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url(thunderstorm.jpg)";
  }
}

// Date Manage
function dateManage(dateArg) {
  let dates = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = dates[dateArg.getDay()];

  return `${date} ${month} (${day}) ${year}`;
}
