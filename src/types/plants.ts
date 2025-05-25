export type WateringFrequency = 'low' | 'medium' | 'high';
export type LightPreference = 'full sun' | 'partial sun' | 'shade';
export type Priority = 'low' | 'medium' | 'high';

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  description: string;
  wateringFrequency: WateringFrequency;
  lightPreference: LightPreference;
  fertilizer: string;
  heightRange: {
    min: number; // in cm
    max: number; // in cm
  };
  idealTemperature: {
    min: number; // in Celsius
    max: number; // in Celsius
  };
  careInstructions: string;
}

export interface UserPlant extends Plant {
  addedAt: string;
  lastWatered: string | null;
  lastFertilized: string | null;
  careHistory: CareHistoryEntry[];
}

export interface CareHistoryEntry {
  date: string;
  action: string;
}

export interface CareAction {
  id: string;
  name: string;
  description: string;
  priority: Priority;
}