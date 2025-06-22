
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ForecastData {
  time: string;
  aqi: number;
}

interface ForecastChartProps {
  data: ForecastData[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#00e400';
    if (aqi <= 100) return '#ffff00';
    if (aqi <= 150) return '#ff7e00';
    if (aqi <= 200) return '#ff0000';
    if (aqi <= 300) return '#8f3f97';
    return '#7e0023';
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const aqi = payload[0].value;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{`Time: ${label}h`}</p>
          <p className="text-sm">
            <span className="font-medium">AQI: </span>
            <span style={{ color: getAQIColor(aqi) }}>{aqi}</span>
          </p>
          <p className="text-xs text-gray-600">{getAQILevel(aqi)}</p>
        </div>
      );
    }
    return null;
  };

  const currentAQI = data[0]?.aqi || 0;
  const avgAQI = Math.round(data.reduce((sum, item) => sum + item.aqi, 0) / data.length);
  const maxAQI = Math.max(...data.map(item => item.aqi));
  const minAQI = Math.min(...data.map(item => item.aqi));

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">72-Hour Forecast</h2>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: getAQIColor(currentAQI) }}>
            {currentAQI}
          </div>
          <div className="text-xs text-gray-600">Current AQI</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{avgAQI}</div>
          <div className="text-xs text-gray-600">Average</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{minAQI}</div>
          <div className="text-xs text-gray-600">Minimum</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">{maxAQI}</div>
          <div className="text-xs text-gray-600">Maximum</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }}
              stroke="#6b7280"
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              stroke="#6b7280"
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#aqiGradient)"
            />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: '#3b82f6' }}
              activeDot={{ r: 5, fill: '#1d4ed8' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Analysis */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Trend Analysis</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Peak AQI expected around hour {data.findIndex(item => item.aqi === maxAQI)}</p>
          <p>• Best air quality around hour {data.findIndex(item => item.aqi === minAQI)}</p>
          <p>• Overall trend: {avgAQI > currentAQI ? 'Improving' : 'Declining'}</p>
        </div>
      </div>
    </Card>
  );
};

export default ForecastChart;
