const apiKey = 'your-api-key'; // Replace with your OpenWeather API key

// Function to get weather data
async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherDetails = document.getElementById('weather-details');
    const errorMessage = document.getElementById('error-message');

    if (city === '') {
        alert('Please enter a city!');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            // Handle city not found
            weatherDetails.style.display = 'none';
            errorMessage.style.display = 'block';
        } else {
            // Display weather data
            weatherDetails.style.display = 'block';
            errorMessage.style.display = 'none';

            document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again later.');
    }
}
