import React from 'react';
import { WeatherData } from '../../types/weather';
import { CloudRain, CloudSun, Cloud, Wind, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherCardProps {
  weather: WeatherData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  if (!weather) {
    return (
      <div className="card mb-6 flex items-center justify-center h-28">
        <p className="text-gray-500">Loading weather data...</p>
      </div>
    );
  }
  
  // Weather icon based on condition
  const renderWeatherIcon = () => {
    switch (weather.condition) {
      case 'rainy':
        return <CloudRain size={40} className="text-blue-500" />;
      case 'cloudy':
        return <Cloud size={40} className="text-gray-500" />;
      case 'windy':
        return <Wind size={40} className="text-blue-400" />;
      case 'sunny':
        return <Sun size={40} className="text-yellow-500" />;
      case 'clear':
      default:
        return <CloudSun size={40} className="text-blue-500" />;
    }
  };
  
  return (
    <motion.div 
      className="card mb-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div 
          className="mr-4"
          animate={{ 
            y: [0, 5, 0],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {renderWeatherIcon()}
        </motion.div>
        
        <div>
          <div className="flex items-baseline">
            <h2 className="text-2xl font-semibold">{weather.temperature}°C</h2>
            <p className="ml-2 text-gray-600 capitalize">{weather.description}</p>
          </div>
          <p className="text-gray-500">{weather.location}</p>
        </div>
        
        <div className="ml-auto text-right">
          <p className="text-gray-600">Humidity: {weather.humidity}%</p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(weather.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;