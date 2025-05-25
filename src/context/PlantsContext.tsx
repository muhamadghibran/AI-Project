import React, { createContext, useContext, useState, useEffect } from 'react';
import { Plant, UserPlant, CareAction } from '../types/plants';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage';
import plantsData from '../data/plants';
import { useWeather } from './WeatherContext';
import { determineActions } from '../utils/plantCare';

interface PlantsContextType {
  availablePlants: Plant[];
  userPlants: UserPlant[];
  isLoading: boolean;
  addPlant: (plantId: string) => void;
  removePlant: (plantId: string) => void;
  getPlantById: (id: string) => Plant | undefined;
  getUserPlantById: (id: string) => UserPlant | undefined;
  todaysActions: Map<string, CareAction[]>;
  markActionComplete: (plantId: string, actionId: string) => void;
}

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantsProvider');
  }
  return context;
};

export const PlantsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availablePlants] = useState<Plant[]>(plantsData);
  const [userPlants, setUserPlants] = useState<UserPlant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todaysActions, setTodaysActions] = useState<Map<string, CareAction[]>>(new Map());
  
  const { weather, weatherCondition } = useWeather();

  useEffect(() => {
    // Load user plants from local storage
    const savedPlants = getLocalStorageItem('userPlants');
    if (savedPlants) {
      setUserPlants(JSON.parse(savedPlants));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Save user plants to local storage whenever they change
    if (!isLoading) {
      setLocalStorageItem('userPlants', JSON.stringify(userPlants));
    }
  }, [userPlants, isLoading]);

  useEffect(() => {
    // Determine care actions for each plant based on weather
    if (weather && userPlants.length > 0) {
      const actionsMap = new Map<string, CareAction[]>();
      
      userPlants.forEach(plant => {
        const plantActions = determineActions(plant, weatherCondition);
        actionsMap.set(plant.id, plantActions);
      });
      
      setTodaysActions(actionsMap);
    }
  }, [weather, userPlants, weatherCondition]);

  const addPlant = (plantId: string) => {
    const plantToAdd = availablePlants.find(p => p.id === plantId);
    if (!plantToAdd) return;
    
    const userHasPlant = userPlants.some(p => p.id === plantId);
    if (userHasPlant) return;
    
    const newUserPlant: UserPlant = {
      ...plantToAdd,
      addedAt: new Date().toISOString(),
      lastWatered: null,
      lastFertilized: null,
      careHistory: [],
    };
    
    setUserPlants(prev => [...prev, newUserPlant]);
  };

  const removePlant = (plantId: string) => {
    setUserPlants(prev => prev.filter(p => p.id !== plantId));
  };

  const getPlantById = (id: string) => {
    return availablePlants.find(p => p.id === id);
  };

  const getUserPlantById = (id: string) => {
    return userPlants.find(p => p.id === id);
  };

  const markActionComplete = (plantId: string, actionId: string) => {
    setUserPlants(prev => prev.map(plant => {
      if (plant.id !== plantId) return plant;
      
      const now = new Date().toISOString();
      const historyEntry = {
        date: now,
        action: actionId,
      };
      
      // Update specific tracking fields based on action
      let updates = {};
      if (actionId === 'water') {
        updates = { lastWatered: now };
      } else if (actionId === 'fertilize') {
        updates = { lastFertilized: now };
      }
      
      return {
        ...plant,
        ...updates,
        careHistory: [...plant.careHistory, historyEntry],
      };
    }));
  };

  return (
    <PlantsContext.Provider 
      value={{ 
        availablePlants, 
        userPlants, 
        isLoading, 
        addPlant, 
        removePlant,
        getPlantById,
        getUserPlantById,
        todaysActions,
        markActionComplete,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};