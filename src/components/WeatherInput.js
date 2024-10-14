import React, { useState } from 'react';
import axios from 'axios';

const WeatherInput = ({ fetchWeather }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
      setSuggestions([]);
    }
  };

  const fetchCitySuggestions = async (query) => {
    if (query.length < 3) return; 
    const apiKey = 'd0cb01dd44mshe68a0d2cfa58e4ap1ea5fajsn9d0940fe73dd'; 
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`;
    
    try {
      const response = await axios.get(url, {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      });
      setSuggestions(response.data.data.map(city => city.city));
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setCity(query);
    fetchCitySuggestions(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Stadt eingeben"
          list="city-suggestions"
        />
        <button type="submit">Wetter abrufen</button>
      </form>

      <datalist id="city-suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </div>
  );
};

export default WeatherInput;
