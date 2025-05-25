import React from 'react';
import { Plant } from '../../types/plants';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, Droplets, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlantCardProps {
  plant: Plant;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  selectable?: boolean;
}

const PlantCard: React.FC<PlantCardProps> = ({ 
  plant, 
  isSelected = false, 
  onToggleSelect,
  selectable = false,
}) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/plants/${plant.id}`);
  };
  
  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect();
    }
  };
  
  return (
    <motion.div 
      className="card overflow-hidden cursor-pointer h-full"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      onClick={handleCardClick}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-40 -mx-6 -mt-6 mb-4">
        <img 
          src={plant.image} 
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        
        {selectable && (
          <button
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isSelected 
                ? 'bg-green-600 text-white' 
                : 'bg-white bg-opacity-70 text-gray-600'
            }`}
            onClick={handleSelectClick}
            aria-label={isSelected ? 'Remove plant' : 'Add plant'}
          >
            {isSelected ? <Check size={18} /> : <Plus size={18} />}
          </button>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-2 px-4">
          <p className="text-white font-medium">{plant.name}</p>
          <p className="text-white/80 text-xs italic">{plant.scientificName}</p>
        </div>
      </div>
      
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <Droplets size={16} className="text-blue-500 mr-1" />
          <span className="text-sm text-gray-600 capitalize">{plant.wateringFrequency}</span>
        </div>
        
        <div className="flex items-center">
          <Sun size={16} className="text-yellow-500 mr-1" />
          <span className="text-sm text-gray-600 capitalize">{plant.lightPreference}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm line-clamp-2">{plant.description}</p>
    </motion.div>
  );
};

export default PlantCard;