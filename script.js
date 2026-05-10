// =============================
// OPENWEATHER API KEY
// =============================

// Replace this with your real API key
const API_KEY = "YOUR_API_KEY_HERE";

// =============================
// ELEMENTS
// =============================

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");

// =============================
// FETCH WEATHER DATA
// =============================

async function getWeather(city) {

  try {

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    updateWeatherUI(data);

  } catch (error) {

    alert(error.message);

  }
}

// =============================
// UPDATE UI
// =============================

function updateWeatherUI(data) {

  cityName.textContent = `${data.name}, ${data.sys.country}`;

  temperature.textContent =
    `${Math.round(data.main.temp)}°C`;

  description.textContent =
    data.weather[0].description;

  humidity.textContent =
    `${data.main.humidity}%`;

  wind.textContent =
    `${data.wind.speed} km/h`;

  feelsLike.textContent =
    `${Math.round(data.main.feels_like)}°C`;

  const iconCode = data.weather[0].icon;

  weatherIcon.src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// =============================
// BUTTON EVENT
// =============================

searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if (city !== "") {
    getWeather(city);
  }

});

// =============================
// ENTER KEY SUPPORT
// =============================

cityInput.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {

    const city = cityInput.value.trim();

    if (city !== "") {
      getWeather(city);
    }
  }
});

// =============================
// DEFAULT CITY
// =============================

getWeather("London");