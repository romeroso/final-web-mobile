import React from 'react';
import Card from '../ui/Card';
import { HealthMetric } from '../../types';

interface MetricCardProps {
  metric: HealthMetric;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, className = '' }) => {
  const getIconColor = (metricName: string) => {
    switch(metricName.toLowerCase()) {
      case 'steps': return 'text-blue-500';
      case 'sleep': return 'text-purple-500';
      case 'heart rate': return 'text-red-500';
      case 'water': return 'text-sky-500';
      case 'calories': return 'text-orange-500';
      case 'weight': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };
  
  const getIconBgColor = (metricName: string) => {
    switch(metricName.toLowerCase()) {
      case 'steps': return 'bg-blue-50';
      case 'sleep': return 'bg-purple-50';
      case 'heart rate': return 'bg-red-50';
      case 'water': return 'bg-sky-50';
      case 'calories': return 'bg-orange-50';
      case 'weight': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };
  
  // This would import the icon dynamically based on its name
  // For simplicity, we'll just use the icon passed in the metric
  
  return (
    <Card className={`flex items-center p-4 ${className}`}>
      <div className={`p-3 rounded-lg ${getIconBgColor(metric.name)}`}>
        <span className={`text-xl ${getIconColor(metric.name)}`} dangerouslySetInnerHTML={{ __html: metric.icon }} />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{metric.name}</p>
        <div className="flex items-baseline">
          <p className="text-xl font-semibold text-gray-900">{metric.value}</p>
          <p className="ml-1 text-sm text-gray-500">{metric.unit}</p>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;