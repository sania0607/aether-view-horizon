
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AQIData {
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  aqi: number;
}

interface AQIBreakdownProps {
  data: AQIData;
}

const AQIBreakdown: React.FC<AQIBreakdownProps> = ({ data }) => {
  const pollutants = [
    {
      name: 'PM2.5',
      value: data.pm25,
      unit: 'µg/m³',
      description: 'Fine particulate matter',
      maxValue: 35,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      name: 'PM10',
      value: data.pm10,
      unit: 'µg/m³',
      description: 'Coarse particulate matter',
      maxValue: 150,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      name: 'NO₂',
      value: data.no2,
      unit: 'ppb',
      description: 'Nitrogen dioxide',
      maxValue: 100,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600'
    },
    {
      name: 'O₃',
      value: data.o3,
      unit: 'ppb',
      description: 'Ground-level ozone',
      maxValue: 70,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  ];

  const getHealthLevel = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage <= 50) return { level: 'Good', color: 'text-green-600' };
    if (percentage <= 100) return { level: 'Moderate', color: 'text-yellow-600' };
    if (percentage <= 150) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' };
    return { level: 'Unhealthy', color: 'text-red-600' };
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Air Quality Breakdown</h2>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{data.aqi}</div>
          <div className="text-sm text-gray-600">Overall AQI</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pollutants.map((pollutant) => {
          const percentage = Math.min((pollutant.value / pollutant.maxValue) * 100, 100);
          const healthLevel = getHealthLevel(pollutant.value, pollutant.maxValue);
          
          return (
            <div key={pollutant.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{pollutant.name}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  healthLevel.level === 'Good' ? 'bg-green-100 text-green-800' :
                  healthLevel.level === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  healthLevel.level === 'Unhealthy for Sensitive' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {healthLevel.level}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {pollutant.value}
                  </span>
                  <span className="text-sm text-gray-600">{pollutant.unit}</span>
                </div>
                
                <Progress 
                  value={percentage} 
                  className="h-3 bg-gray-200"
                />
                
                <p className="text-xs text-gray-600">{pollutant.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last updated:</span>
          <span className="font-medium text-gray-900">
            {new Date().toLocaleTimeString()} • {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AQIBreakdown;
