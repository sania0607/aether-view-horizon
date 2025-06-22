
import { useState, useEffect } from 'react';
import AQIMap from '@/components/AQIMap';
import SearchBar from '@/components/SearchBar';
import AQIBreakdown from '@/components/AQIBreakdown';
import ForecastChart from '@/components/ForecastChart';
import HealthAdvisory from '@/components/HealthAdvisory';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    name: 'San Francisco, CA',
    lat: 37.7749,
    lng: -122.4194,
    aqi: 42
  });

  const [aqiData, setAqiData] = useState({
    pm25: 12,
    pm10: 18,
    no2: 8,
    o3: 15,
    aqi: 42
  });

  const [forecastData, setForecastData] = useState([
    { time: '00:00', aqi: 42 },
    { time: '03:00', aqi: 38 },
    { time: '06:00', aqi: 45 },
    { time: '09:00', aqi: 52 },
    { time: '12:00', aqi: 58 },
    { time: '15:00', aqi: 61 },
    { time: '18:00', aqi: 55 },
    { time: '21:00', aqi: 47 },
    { time: '24:00', aqi: 43 },
    { time: '27:00', aqi: 39 },
    { time: '30:00', aqi: 41 },
    { time: '33:00', aqi: 44 },
    { time: '36:00', aqi: 48 },
    { time: '39:00', aqi: 52 },
    { time: '42:00', aqi: 56 },
    { time: '45:00', aqi: 54 },
    { time: '48:00', aqi: 50 },
    { time: '51:00', aqi: 46 },
    { time: '54:00', aqi: 42 },
    { time: '57:00', aqi: 40 },
    { time: '60:00', aqi: 38 },
    { time: '63:00', aqi: 41 },
    { time: '66:00', aqi: 45 },
    { time: '69:00', aqi: 48 },
    { time: '72:00', aqi: 51 }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Search */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AirVision Pro
              </h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Real-time monitoring</span>
              </div>
            </div>
            <SearchBar onLocationSelect={setSelectedLocation} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Map Section - Takes up 3/4 on desktop */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="p-0 overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <div className="h-[500px] md:h-[600px] relative">
              <AQIMap selectedLocation={selectedLocation} onLocationChange={setSelectedLocation} />
            </div>
          </Card>

          {/* AQI Breakdown */}
          <AQIBreakdown data={aqiData} />
        </div>

        {/* Right Panel - Forecast and Health Advisory */}
        <div className="xl:col-span-1 space-y-6">
          <ForecastChart data={forecastData} />
          <HealthAdvisory aqi={aqiData.aqi} location={selectedLocation.name} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-md border-t border-gray-200/50 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">Data updated every hour • Sources: EPA, WHO, Local Monitoring Stations</p>
            <p className="text-xs mt-2 opacity-75">© 2024 AirVision Pro. Environmental data for awareness and health.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
