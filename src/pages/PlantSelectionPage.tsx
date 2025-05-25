import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlants } from '../context/PlantsContext';
import PlantCard from '../components/features/PlantCard';
import { Search } from 'lucide-react';

const PlantSelectionPage: React.FC = () => {
  const { availablePlants, userPlants, addPlant, removePlant } = usePlants();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPlants = availablePlants.filter(
    plant => plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Check if plant is in user's collection
  const isPlantSelected = (plantId: string): boolean => {
    return userPlants.some(p => p.id === plantId);
  };
  
  // Toggle plant selection
  const togglePlantSelection = (plantId: string) => {
    if (isPlantSelected(plantId)) {
      removePlant(plantId);
    } else {
      addPlant(plantId);
    }
  };
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <AnimatePresence>
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              isSelected={isPlantSelected(plant.id)}
              onToggleSelect={() => togglePlantSelection(plant.id)}
              selectable={true}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredPlants.length === 0 && (
        <motion.div 
          className="card text-center mt-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600">No plants found matching "{searchTerm}"</p>
        </motion.div>
      )}
      
      <motion.div 
        className="fixed bottom-20 right-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: userPlants.length > 0 ? 1 : 0,
          opacity: userPlants.length > 0 ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-green-600 text-white rounded-full py-1 px-3 text-sm font-medium">
          {userPlants.length} {userPlants.length === 1 ? 'plant' : 'plants'} selected
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlantSelectionPage;