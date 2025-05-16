import React from 'react';
import { PlusCircle, Activity, Droplet, Moon, Heart } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import GoalProgress from '../components/dashboard/GoalProgress';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { HealthMetric, Goal } from '../types';

// Mock data for presentation
const mockMetrics: HealthMetric[] = [
  { id: '1', name: 'Steps', value: 8457, unit: 'steps', date: '2025-05-01', icon: '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 5.93 13 2v3H8l-4 4 1 1 3-3h5v3l6-4.07z"/><path d="M19 13.93 13 10v3H8l-4 4 1 1 3-3h5v3l6-4.07z"/></svg>' },
  { id: '2', name: 'Sleep', value: 7.5, unit: 'hours', date: '2025-05-01', icon: '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V2m0 20v-2m8-8h2M6 12H4m14.25-4.25L20 6m-1.75 12.25L20 20M7.75 7.75 6 6m1.75 12.25L6 20"/><circle cx="12" cy="12" r="10"/></svg>' },
  { id: '3', name: 'Heart Rate', value: 72, unit: 'bpm', date: '2025-05-01', icon: '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>' },
  { id: '4', name: 'Water', value: 1.8, unit: 'liters', date: '2025-05-01', icon: '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v6m0 0 4 10M12 8 8 18m1-16h6"/></svg>' }
];

const mockActivityData = [
  { day: 'Mon', value: 7520 },
  { day: 'Tue', value: 8245 },
  { day: 'Wed', value: 6700 },
  { day: 'Thu', value: 9300 },
  { day: 'Fri', value: 8100 },
  { day: 'Sat', value: 8900 },
  { day: 'Sun', value: 8457 }
];

const mockSleepData = [
  { day: 'Mon', value: 7.2 },
  { day: 'Tue', value: 6.8 },
  { day: 'Wed', value: 8.0 },
  { day: 'Thu', value: 7.5 },
  { day: 'Fri', value: 6.5 },
  { day: 'Sat', value: 8.2 },
  { day: 'Sun', value: 7.5 }
];

const mockGoals: Goal[] = [
  { id: '1', type: 'steps', target: 10000, current: 8457, unit: 'steps' },
  { id: '2', type: 'water', target: 2.5, current: 1.8, unit: 'L' },
  { id: '3', type: 'sleep', target: 8, current: 7.5, unit: 'hrs' }
];

const Dashboard: React.FC = () => {
  const { state } = useAuth();
  const { user } = state;
  
  if (!user) return null;
  
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-500">Here's your health summary for today</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button>
            <PlusCircle size={18} className="mr-2" />
            Add Health Data
          </Button>
        </div>
      </div>
      
      {/* Health metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockMetrics.map(metric => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProgressChart 
          title="Steps This Week" 
          data={mockActivityData} 
          color="bg-blue-500"
          unit="steps"
        />
        <ProgressChart 
          title="Sleep Duration" 
          data={mockSleepData} 
          color="bg-purple-500" 
          unit="hrs"
        />
      </div>
      
      {/* Goals section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Your Goals</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockGoals.map(goal => (
            <GoalProgress key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
      
      {/* Activity cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-0 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border-2 border-transparent hover:border-blue-100">
          <div className="p-5">
            <div className="mb-3 bg-blue-50 h-10 w-10 rounded-full flex items-center justify-center">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Activity</h3>
            <p className="text-gray-500 text-sm">Track your daily exercises and movements</p>
          </div>
          <div className="h-1 bg-blue-500 w-full"></div>
        </Card>
        
        <Card className="p-0 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border-2 border-transparent hover:border-sky-100">
          <div className="p-5">
            <div className="mb-3 bg-sky-50 h-10 w-10 rounded-full flex items-center justify-center">
              <Droplet className="h-5 w-5 text-sky-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Water</h3>
            <p className="text-gray-500 text-sm">Log your daily water intake to stay hydrated</p>
          </div>
          <div className="h-1 bg-sky-500 w-full"></div>
        </Card>
        
        <Card className="p-0 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border-2 border-transparent hover:border-purple-100">
          <div className="p-5">
            <div className="mb-3 bg-purple-50 h-10 w-10 rounded-full flex items-center justify-center">
              <Moon className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Sleep</h3>
            <p className="text-gray-500 text-sm">Monitor your sleep patterns for better rest</p>
          </div>
          <div className="h-1 bg-purple-500 w-full"></div>
        </Card>
        
        <Card className="p-0 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border-2 border-transparent hover:border-red-100">
          <div className="p-5">
            <div className="mb-3 bg-red-50 h-10 w-10 rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Heart</h3>
            <p className="text-gray-500 text-sm">Keep track of your heart rate and health</p>
          </div>
          <div className="h-1 bg-red-500 w-full"></div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;