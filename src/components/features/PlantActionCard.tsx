import React, { useState } from 'react';
import { UserPlant, CareAction } from '../../types/plants';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlants } from '../../context/PlantsContext';

interface PlantActionCardProps {
  plant: UserPlant;
  actions: CareAction[];
}

const PlantActionCard: React.FC<PlantActionCardProps> = ({ plant, actions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const navigate = useNavigate();
  const { markActionComplete } = usePlants();
  
  const handleCompleteAction = (actionId: string) => {
    setCompletedActions(prev => [...prev, actionId]);
    markActionComplete(plant.id, actionId);
  };
  
  const handleCardClick = () => {
    navigate(`/plants/${plant.id}`);
  };
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  // Sort actions by priority
  const sortedActions = [...actions].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  return (
    <motion.div 
      className="card overflow-hidden"
      layout
      transition={{ duration: 0.3 }}
    >
      <div 
        className="flex items-center cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img 
            src={plant.image} 
            alt={plant.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="font-semibold">{plant.name}</h3>
          <p className="text-sm text-gray-600">{actions.length} {actions.length === 1 ? 'action' : 'actions'} needed</p>
        </div>
        
        <button 
          className="ml-4 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          onClick={toggleExpand}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <div className="space-y-4">
              {sortedActions.map(action => {
                const isCompleted = completedActions.includes(action.id);
                
                return (
                  <div 
                    key={action.id}
                    className={`p-3 rounded-lg ${
                      isCompleted 
                        ? 'bg-green-50 border border-green-100' 
                        : action.priority === 'high'
                          ? 'bg-red-50 border border-red-100'
                          : action.priority === 'medium'
                            ? 'bg-yellow-50 border border-yellow-100'
                            : 'bg-blue-50 border border-blue-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                          {action.name}
                        </h4>
                        <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                          {action.description}
                        </p>
                      </div>
                      
                      {!isCompleted && (
                        <button 
                          className="bg-white border border-gray-200 hover:bg-green-50 text-green-600 p-2 rounded-full flex-shrink-0"
                          onClick={() => handleCompleteAction(action.id)}
                          aria-label="Mark as completed"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      
                      {isCompleted && (
                        <div className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded font-medium">
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlantActionCard;