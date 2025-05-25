export type WeatherCondition = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'clear';

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  condition: WeatherCondition;
  description: string;
  lastUpdated: string;
}