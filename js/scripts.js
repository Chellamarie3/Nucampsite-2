const carousel = new bootstrap.Carousel("#homeCarousel", {
  interval: 5000,
  pause: false,
});

const carouselButton = document.getElementById("carouselButton");
const faIcon = document.getElementById("faButton");

carouselButton.addEventListener("click", function () {
  if (faIcon.classList.contains("fa-pause")) {
    faIcon.classList.remove("fa-pause");
    faIcon.classList.add("fa-play");
    carousel.pause();
  } else {
    faIcon.classList.remove("fa-play");
    faIcon.classList.add("fa-pause");
    carousel.cycle();
  }
});
async function fetchWeather() {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const city = "beaverton";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  const response = await fetch(url).catch(() => {
    console.log("error calling url");
  });
  const data = await response.json().catch(() => {
    console.log("error parsing response");
  });
  displayWeather(data);
}
async function displayWeather(data) {
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const windSpeed = data.wind.speed;
  const name = data.name;

  console.log(`temp ${temp} description ${description} icon ${icon}`);
  const img = document.createElement("img");
  img.src = `https://openweathermap.org/img/w/${icon}.png`;
  document.getElementById("weather-icon").appendChild(img);
  document.getElementById("weather-temp").textContent = `${temp} \u00B0`;
  document.getElementById("weather-description").textContent = description;
  document.getElementById("wind-speed").textContent = windSpeed;
  document.getElementById("name").textContent = ` - ${name}`;
}

fetchWeather();
