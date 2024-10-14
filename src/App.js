import React, { useState } from 'react';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = '000f1eb944bff5a985c71a8bfbccfbd4'; 
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=de&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Wetter App</h1>
      <WeatherInput fetchWeather={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
}

export default App;
