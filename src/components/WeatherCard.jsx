import React from 'react';

const WeatherCard = React.memo(({ weather, children }) => {
  if (!weather) return null;

  const { location, current } = weather;

  return (
    <div className="weather-card">
      <h2>{children}</h2>
      <h3>{location.name}, {location.country}</h3>
      <p>Temperature: {current.temp_c}°C</p>
      <p>Condition: {current.condition.text}</p>
      <img src={current.condition.icon} alt={current.condition.text} />
    </div>
  );
});

export default WeatherCard;
