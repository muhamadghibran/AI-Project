import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';
import { usePlants } from '../context/PlantsContext';
import { Cloud, CloudRain, CloudSun, Sun, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import WeatherCard from '../components/features/WeatherCard';
import PlantActionCard from '../components/features/PlantActionCard';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { weather, weatherCondition } = useWeather();
  const { userPlants, todaysActions } = usePlants();
  
  // Get all plants that need actions today
  const plantsNeedingCare = userPlants.filter(
    plant => todaysActions.has(plant.id) && todaysActions.get(plant.id)?.length > 0
  );
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Weather Section */}
      <WeatherCard weather={weather} />
      
      {/* Plants Needing Care */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Today's Plant Care</h2>
          <button 
            onClick={() => navigate('/plants')}
            className="text-sm text-green-600 hover:text-green-800"
          >
            Manage Plants
          </button>
        </div>
        
        {userPlants.length === 0 ? (
          <motion.div 
            className="card text-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 mb-4">You haven't added any plants yet!</p>
            <button 
              onClick={() => navigate('/plants')}
              className="btn-primary"
            >
              Add Plants
            </button>
          </motion.div>
        ) : plantsNeedingCare.length === 0 ? (
          <motion.div 
            className="card text-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600">All your plants are taken care of! 🌱</p>
            <p className="text-gray-500 text-sm mt-2">Check back tomorrow for new recommendations.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {plantsNeedingCare.map(plant => {
              const actions = todaysActions.get(plant.id) || [];
              
              return (
                <PlantActionCard 
                  key={plant.id} 
                  plant={plant} 
                  actions={actions} 
                />
              );
            })}
          </div>
        )}
      </motion.section>
      
      {/* Quick Tips */}
      <motion.section
        className="mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weather-Based Tips</h2>
        
        <div className="card">
          <h3 className="font-medium text-lg mb-2">
            {weatherCondition === 'sunny' && 'Sunny Day Plant Care'}
            {weatherCondition === 'rainy' && 'Rainy Day Plant Care'}
            {weatherCondition === 'cloudy' && 'Cloudy Day Plant Care'}
            {weatherCondition === 'windy' && 'Windy Day Plant Care'}
            {weatherCondition === 'clear' && 'Clear Day Plant Care'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {weatherCondition === 'sunny' && 'On sunny days, monitor soil moisture more frequently as plants may dry out faster. Consider moving sensitive plants away from direct sunlight.'}
            {weatherCondition === 'rainy' && 'Check drainage on potted plants during rainy periods to prevent root rot. Hold off on watering until soil dries out.'}
            {weatherCondition === 'cloudy' && 'Cloudy days are perfect for repotting or transplanting as plants experience less stress without direct sunlight.'}
            {weatherCondition === 'windy' && 'Consider bringing smaller potted plants indoors or providing shelter from strong winds. Check soil moisture as wind can dry plants out.'}
            {weatherCondition === 'clear' && 'Clear days are great for plant maintenance. Check for pests, prune as needed, and ensure adequate watering.'}
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default DashboardPage;