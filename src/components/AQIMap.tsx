
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Location {
  name: string;
  lat: number;
  lng: number;
  aqi: number;
}

interface AQIMapProps {
  selectedLocation: Location;
  onLocationChange: (location: Location) => void;
}

const AQIMap: React.FC<AQIMapProps> = ({ selectedLocation, onLocationChange }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Sample AQI data for different cities
  const aqiLocations = [
    { name: 'San Francisco, CA', lat: 37.7749, lng: -122.4194, aqi: 42 },
    { name: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, aqi: 87 },
    { name: 'New York, NY', lat: 40.7128, lng: -74.0060, aqi: 54 },
    { name: 'Chicago, IL', lat: 41.8781, lng: -87.6298, aqi: 38 },
    { name: 'Houston, TX', lat: 29.7604, lng: -95.3698, aqi: 65 },
    { name: 'Phoenix, AZ', lat: 33.4484, lng: -112.0740, aqi: 78 },
    { name: 'Philadelphia, PA', lat: 39.9526, lng: -75.1652, aqi: 46 },
    { name: 'San Antonio, TX', lat: 29.4241, lng: -98.4936, aqi: 52 },
    { name: 'San Diego, CA', lat: 32.7157, lng: -117.1611, aqi: 35 },
    { name: 'Dallas, TX', lat: 32.7767, lng: -96.7970, aqi: 61 }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#00e400'; // Good - Green
    if (aqi <= 100) return '#ffff00'; // Moderate - Yellow
    if (aqi <= 150) return '#ff7e00'; // Unhealthy for Sensitive - Orange
    if (aqi <= 200) return '#ff0000'; // Unhealthy - Red
    if (aqi <= 300) return '#8f3f97'; // Very Unhealthy - Purple
    return '#7e0023'; // Hazardous - Maroon
  };

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [selectedLocation.lng, selectedLocation.lat],
      zoom: 4
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add markers for each location
      aqiLocations.forEach((location) => {
        const el = document.createElement('div');
        el.className = 'aqi-marker';
        el.style.width = '40px';
        el.style.height = '40px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = getAQIColor(location.aqi);
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '12px';
        el.style.fontWeight = 'bold';
        el.style.color = location.aqi > 150 ? 'white' : 'black';
        el.innerHTML = location.aqi.toString();
        
        el.addEventListener('click', () => {
          onLocationChange(location);
        });

        new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .addTo(map.current!);
      });
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <h3 className="text-xl font-semibold mb-4 text-center">Initialize Map</h3>
          <p className="text-gray-600 text-sm mb-4 text-center">
            Please enter your Mapbox public token to enable the interactive map.
          </p>
          <p className="text-gray-500 text-xs mb-4 text-center">
            Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
          </p>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijo..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleTokenSubmit} className="w-full">
              Initialize Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h4 className="font-semibold text-sm mb-2">AQI Scale</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00e400' }}></div>
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffff00' }}></div>
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff7e00' }}></div>
            <span>Unhealthy for Sensitive (101-150)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff0000' }}></div>
            <span>Unhealthy (151-200)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8f3f97' }}></div>
            <span>Very Unhealthy (201-300)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#7e0023' }}></div>
            <span>Hazardous (301+)</span>
          </div>
        </div>
      </div>

      {/* Current Location Info */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold text-lg">{selectedLocation.name}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: getAQIColor(selectedLocation.aqi) }}
          ></div>
          <span className="text-2xl font-bold">{selectedLocation.aqi}</span>
          <span className="text-gray-600">AQI</span>
        </div>
      </div>
    </div>
  );
};

export default AQIMap;
