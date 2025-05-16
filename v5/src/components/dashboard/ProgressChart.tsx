import React from 'react';
import Card from '../ui/Card';

interface ProgressChartProps {
  title: string;
  data: {
    day: string;
    value: number;
  }[];
  color?: string;
  unit?: string;
  className?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  title, 
  data, 
  color = 'bg-sky-500', 
  unit = '',
  className = '' 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      
      <div className="flex items-end space-x-2 h-32">
        {data.map((item, index) => {
          const height = item.value ? Math.max(15, (item.value / maxValue) * 100) : 2;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`${color} rounded-t-sm w-full transition-all duration-300`}
                style={{ height: `${height}%` }}
              />
              <p className="text-xs text-gray-500 mt-1">{item.day}</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Average</p>
          <p className="font-medium">
            {(data.reduce((acc, d) => acc + d.value, 0) / data.length).toFixed(1)}
            {unit && <span className="ml-1 text-xs text-gray-500">{unit}</span>}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Today</p>
          <p className="font-medium">
            {data[data.length - 1].value}
            {unit && <span className="ml-1 text-xs text-gray-500">{unit}</span>}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProgressChart;