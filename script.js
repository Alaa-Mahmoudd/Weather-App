const weatherCards = document.querySelector("#weather-cards");
const cityInput = document.querySelector("#city-input");
const findBtn = document.querySelector("#find-btn");

// Fetch weather data
function fetchWeather(city) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=791bd633d78245ffa37203024241911&q=${city}&days=3`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateWeatherCards(data.forecast.forecastday);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

// Update weather cards
function updateWeatherCards(forecastDays) {
  weatherCards.innerHTML = ""; // Clear previous cards

  forecastDays.forEach((day) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    const card = `
      <div class="weather-card">
        <h3>${dayName}</h3>
        <h2>${day.day.avgtemp_c}°C</h2>
        <p>${day.day.condition.text}</p>
      
      </div>
    `;

    weatherCards.innerHTML += card;
  });
}

// Get weather by city name
findBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  }
});

// Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeather(`${lat},${lon}`);
  },
  (error) => {
    console.error("Error getting location:", error.message);
  }
);
