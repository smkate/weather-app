window.addEventListener('load', () => {
    let long,
        lat,
        temperatureDescription = document.querySelector('.temperature-description'),
        temperatureDegree = document.querySelector('.temperature-degree'),
        locationTimezone = document.querySelector('.location-timezone'),
        temperatureSection = document.querySelector('temperature-section');
    const temperatureSpan = document.querySelector('temperature-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;


        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                // Set DOM Elements from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // FORMULA for CELSIUS
                let celsius = (temperature - 32) * (5 / 9);
                // Set Icon
                setIcons(icon, document.querySelector('.icon'));

                // Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C';
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });
    }

    function setIcons(icons, iconID) {
        const skycons = new Skycons ({color: 'white'}),
              currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});