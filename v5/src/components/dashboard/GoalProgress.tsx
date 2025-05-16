import React from 'react';
import Card from '../ui/Card';
import { Goal } from '../../types';

interface GoalProgressProps {
  goal: Goal;
  className?: string;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goal, className = '' }) => {
  const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
  
  // Color mapping based on goal type
  const getColors = (type: string) => {
    switch(type) {
      case 'steps':
        return { bg: 'bg-blue-100', fill: 'bg-blue-500', text: 'text-blue-500' };
      case 'water':
        return { bg: 'bg-sky-100', fill: 'bg-sky-500', text: 'text-sky-500' };
      case 'sleep':
        return { bg: 'bg-purple-100', fill: 'bg-purple-500', text: 'text-purple-500' };
      case 'weight':
        return { bg: 'bg-green-100', fill: 'bg-green-500', text: 'text-green-500' };
      case 'activity':
        return { bg: 'bg-red-100', fill: 'bg-red-500', text: 'text-red-500' };
      default:
        return { bg: 'bg-gray-100', fill: 'bg-gray-500', text: 'text-gray-500' };
    }
  };
  
  const colors = getColors(goal.type);
  
  // Get display name from goal type
  const getDisplayName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900">{getDisplayName(goal.type)} Goal</h3>
        <span className={`text-sm font-medium ${colors.text}`}>{percentage}%</span>
      </div>
      
      <div className={`w-full h-2 ${colors.bg} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${colors.fill} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {goal.current} {goal.unit}
        </span>
        <span className="text-gray-700 font-medium">
          Goal: {goal.target} {goal.unit}
        </span>
      </div>
    </Card>
  );
};

export default GoalProgress;