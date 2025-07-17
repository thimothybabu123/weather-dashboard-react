import { useEffect, useState } from 'react';

const API_KEY = 'a45103a61d464462969104629250907'; 

const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    let isCancelled = false;
    setLoading(true);
    setError('');
    setWeather(null);
    const fetchWeather = async () => { 
      try {
        await new Promise(res => setTimeout(res, 1000)); 
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        if (!res.ok) throw new Error('Failed to fetch weather.');
        const data = await res.json();
        if (!isCancelled) setWeather(data);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchWeather();

    return () => {
      isCancelled = true;
    };
  }, [city]);

  return { weather, loading, error };
};

export default useWeather;
