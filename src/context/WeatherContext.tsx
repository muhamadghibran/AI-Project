import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeatherData, WeatherCondition } from '../types/weather';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage';

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => Promise<void>;
  weatherCondition: WeatherCondition;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>('clear');

  const mockWeatherData = (): WeatherData => {
    // In a real app, this would be fetched from an actual weather API
    const conditions = ['clear', 'cloudy', 'rainy', 'sunny', 'windy'] as WeatherCondition[];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * 25) + 10; // 10-35°C
    const randomHumidity = Math.floor(Math.random() * 50) + 30; // 30-80%
    
    return {
      location: 'Your Location',
      temperature: randomTemp,
      humidity: randomHumidity,
      condition: randomCondition,
      description: `${randomCondition.charAt(0).toUpperCase() + randomCondition.slice(1)} day`,
      lastUpdated: new Date().toISOString(),
    };
  };

  const getWeatherData = async (): Promise<WeatherData> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if we have cached weather data that's less than 1 hour old
    const cachedWeather = getLocalStorageItem('weatherData');
    if (cachedWeather) {
      const parsedWeather = JSON.parse(cachedWeather) as WeatherData;
      const lastUpdated = new Date(parsedWeather.lastUpdated);
      const now = new Date();
      
      // If cache is less than 1 hour old, use it
      if ((now.getTime() - lastUpdated.getTime()) < 60 * 60 * 1000) {
        return parsedWeather;
      }
    }
    
    // Otherwise, get new data
    const newWeather = mockWeatherData();
    setLocalStorageItem('weatherData', JSON.stringify(newWeather));
    return newWeather;
  };

  const refreshWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData();
      setWeather(data);
      setWeatherCondition(data.condition);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWeather();
    
    // Refresh weather data every hour
    const intervalId = setInterval(refreshWeather, 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, loading, error, refreshWeather, weatherCondition }}>
      {children}
    </WeatherContext.Provider>
  );
};