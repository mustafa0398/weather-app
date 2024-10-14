import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return <p>Keine Wetterdaten verfügbar. Bitte eine gültige Stadt eingeben.</p>;
  }

  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div className="weather-info">
      <h2>{weatherData.name}</h2>
      <img src={iconUrl} alt={weatherData.weather[0].description} />
      <p>{weatherData.weather[0].description}</p>
      <p>Temperatur: {Math.round(weatherData.main.temp)}°C</p>
    </div>
  );
};

export default WeatherDisplay;
