import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import useWeather from './components/useWeather';
import Loader from './components/Loader';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('light');

  const { weather, loading, error } = useWeather(query);

  const handleSearch = () => {
    if (!city.trim()) return;
    setQuery(city);
    setHistory(prev => [city, ...prev.filter(c => c !== city)]);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      <h1>🌤 Weather Info Panel</h1>

      <div className="controls">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather}>Current Weather</WeatherCard>}

      {history.length > 0 && (
        <div className="history">
          <h3>Search History</h3>
          <ul>
            {history.map((item, idx) => (
              <li key={idx} onClick={() => setQuery(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
