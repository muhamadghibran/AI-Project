import { Plant, UserPlant, CareAction } from '../types/plants';
import { WeatherCondition } from '../types/weather';
import { differenceInDays } from 'date-fns';

// Determine what care actions are needed based on plant type and weather
export const determineActions = (plant: UserPlant, weatherCondition: WeatherCondition): CareAction[] => {
  const actions: CareAction[] = [];
  const currentDate = new Date();
  
  // Water actions
  if (needsWatering(plant, weatherCondition)) {
    actions.push({
      id: 'water',
      name: 'Water',
      description: getWateringInstructions(plant, weatherCondition),
      priority: 'high',
    });
  }
  
  // Fertilization
  if (needsFertilizing(plant)) {
    actions.push({
      id: 'fertilize',
      name: 'Fertilize',
      description: `Apply ${plant.fertilizer} fertilizer to promote healthy growth.`,
      priority: 'medium',
    });
  }
  
  // Pruning
  if (needsPruning(plant)) {
    actions.push({
      id: 'prune',
      name: 'Prune',
      description: 'Remove any dead or yellowing leaves to encourage new growth.',
      priority: 'low',
    });
  }
  
  // Specific weather-based actions
  if (weatherCondition === 'sunny' && plant.lightPreference === 'shade') {
    actions.push({
      id: 'shade',
      name: 'Provide Shade',
      description: 'Move your plant away from direct sunlight to prevent leaf burn.',
      priority: 'high',
    });
  }
  
  if (weatherCondition === 'windy' && plant.heightRange.max > 30) {
    actions.push({
      id: 'support',
      name: 'Add Support',
      description: 'Consider adding stakes or support for this tall plant during windy conditions.',
      priority: 'medium',
    });
  }
  
  if (weatherCondition === 'rainy' && plant.wateringFrequency === 'low') {
    actions.push({
      id: 'drainage',
      name: 'Check Drainage',
      description: 'Ensure your plant has proper drainage to prevent root rot during rainy weather.',
      priority: 'high',
    });
  }
  
  return actions;
};

// Determine if plant needs watering based on last watering date and weather
const needsWatering = (plant: UserPlant, weatherCondition: WeatherCondition): boolean => {
  if (!plant.lastWatered) return true;
  
  const lastWateredDate = new Date(plant.lastWatered);
  const daysSinceWatering = differenceInDays(new Date(), lastWateredDate);
  
  // Base watering frequency (in days)
  let wateringInterval;
  switch (plant.wateringFrequency) {
    case 'high':
      wateringInterval = 2;
      break;
    case 'medium':
      wateringInterval = 4;
      break;
    case 'low':
      wateringInterval = 7;
      break;
    default:
      wateringInterval = 3;
  }
  
  // Adjust based on weather
  if (weatherCondition === 'sunny' || weatherCondition === 'windy') {
    wateringInterval -= 1;
  } else if (weatherCondition === 'rainy') {
    wateringInterval += 2;
  }
  
  return daysSinceWatering >= wateringInterval;
};

// Get specific watering instructions based on plant and weather
const getWateringInstructions = (plant: UserPlant, weatherCondition: WeatherCondition): string => {
  let baseInstruction = '';
  
  switch (plant.wateringFrequency) {
    case 'high':
      baseInstruction = 'Water thoroughly until moisture comes out of the drainage holes.';
      break;
    case 'medium':
      baseInstruction = 'Water moderately, keeping soil moist but not soggy.';
      break;
    case 'low':
      baseInstruction = 'Water sparingly, allowing the soil to dry out between waterings.';
      break;
    default:
      baseInstruction = 'Water as needed, checking soil moisture first.';
  }
  
  // Weather-specific adjustments
  if (weatherCondition === 'sunny') {
    return `${baseInstruction} On hot, sunny days like today, consider misting the leaves as well.`;
  } else if (weatherCondition === 'rainy') {
    return `Check soil moisture first - it might still be wet from the rain. ${baseInstruction}`;
  } else if (weatherCondition === 'windy') {
    return `${baseInstruction} Wind can dry out plants faster, so monitor soil moisture closely.`;
  }
  
  return baseInstruction;
};

// Determine if plant needs fertilizing
const needsFertilizing = (plant: UserPlant): boolean => {
  if (!plant.lastFertilized) return true;
  
  const lastFertilizedDate = new Date(plant.lastFertilized);
  const daysSinceFertilizing = differenceInDays(new Date(), lastFertilizedDate);
  
  // Different plants have different fertilizing needs
  const fertilizerInterval = plant.id.includes('flower') ? 14 : 30; // More frequent for flowering plants
  
  return daysSinceFertilizing >= fertilizerInterval;
};

// Determine if plant needs pruning (simplified version)
const needsPruning = (plant: UserPlant): boolean => {
  // In a real app, this would be more sophisticated
  // For demo purposes, we'll suggest pruning every 2 weeks for some plants
  if (!plant.careHistory.some(h => h.action === 'prune')) return true;
  
  const lastPruneEvent = plant.careHistory
    .filter(h => h.action === 'prune')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  
  if (!lastPruneEvent) return false;
  
  const daysSincePruning = differenceInDays(new Date(), new Date(lastPruneEvent.date));
  
  // Only suggest pruning for plants that benefit from it
  return plant.id.includes('flower') && daysSincePruning >= 14;
};