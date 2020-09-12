window.addEventListener("load", () => {
  let long,
    lat,
    temperatureDescription = document.querySelector(".temperature-description"),
    temperatureDegree = document.querySelector(".temperature-degree"),
    locationTimezone = document.querySelector(".location-timezone"),
    temperatureSection = document.querySelector(".temperature-section"),
    icon = document.querySelector(".weather-icon");
  const temperatureSpan = document.querySelector(".temperature-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=aeb0929b33deb524fc5b02133262acf3`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let tempDescription = data.weather[0].description;
          let celsius = data.main.temp - 273;
          // Set DOM Elements from API
          temperatureDegree.textContent = Math.floor(celsius);
          temperatureDescription.textContent =
            tempDescription[0].toUpperCase() + tempDescription.slice(1);
          locationTimezone.textContent = data.name;
          // FORMULA for CELSIUS
          let farenheit = celsius * 1.8 + 32;
          // Set Icon
          icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="weather-icon"/>`;
          // Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(farenheit);
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            }
          });
        });
    });
  }
});
