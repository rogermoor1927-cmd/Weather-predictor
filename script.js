// =============================
// OPENWEATHER API KEY
// =============================

// Replace this with your real API key
const API_KEY = "7fece579eb1f6f08ae3231fd07eac4da";

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
const message = document.getElementById("message");

// =============================
// FETCH WEATHER DATA
// =============================

async function getWeather(city) {

  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    showMessage("Please set your OpenWeather API key in script.js");
    return;
  }

  try {

    showMessage("Loading...");

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "City not found");
    }

    const data = await response.json();

    updateWeatherUI(data);

  } catch (error) {

    showMessage(error.message);

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

  // OpenWeather returns wind speed in m/s — convert to km/h
  wind.textContent =
    `${Math.round(data.wind.speed * 3.6)} km/h`;

  feelsLike.textContent =
    `${Math.round(data.main.feels_like)}°C`;

  const iconCode = data.weather[0].icon;

  weatherIcon.src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showMessage(text) {
  if (!message) return;
  message.textContent = text || "";
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