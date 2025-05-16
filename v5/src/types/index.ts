// User types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Health metrics types
export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: string;
  icon: string;
}

export interface DailyActivity {
  id: string;
  date: string;
  steps: number;
  activeMinutes: number;
  caloriesBurned: number;
}

export interface WaterIntake {
  id: string;
  date: string;
  amount: number; // in ml
}

export interface SleepData {
  id: string;
  date: string;
  duration: number; // in minutes
  quality: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface Goal {
  id: string;
  type: 'steps' | 'water' | 'sleep' | 'weight' | 'activity';
  target: number;
  current: number;
  unit: string;
}

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  date: string;
}