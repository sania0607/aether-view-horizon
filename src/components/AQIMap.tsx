
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

// Custom AQI marker component
const createAQIIcon = (aqi: number) => {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#00e400'; // Good - Green
    if (aqi <= 100) return '#ffff00'; // Moderate - Yellow
    if (aqi <= 150) return '#ff7e00'; // Unhealthy for Sensitive - Orange
    if (aqi <= 200) return '#ff0000'; // Unhealthy - Red
    if (aqi <= 300) return '#8f3f97'; // Very Unhealthy - Purple
    return '#7e0023'; // Hazardous - Maroon
  };

  const color = getAQIColor(aqi);
  const textColor = aqi > 150 ? 'white' : 'black';
  
  return L.divIcon({
    html: `<div style="
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: ${color};
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      color: ${textColor};
    ">${aqi}</div>`,
    className: 'custom-aqi-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Component to handle map center changes
const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const AQIMap: React.FC<AQIMapProps> = ({ selectedLocation, onLocationChange }) => {
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
    if (aqi <= 50) return '#00e400';
    if (aqi <= 100) return '#ffff00';
    if (aqi <= 150) return '#ff7e00';
    if (aqi <= 200) return '#ff0000';
    if (aqi <= 300) return '#8f3f97';
    return '#7e0023';
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[selectedLocation.lat, selectedLocation.lng]}
        zoom={4}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={[selectedLocation.lat, selectedLocation.lng]} />
        
        {aqiLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={createAQIIcon(location.aqi)}
            eventHandlers={{
              click: () => onLocationChange(location)
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-semibold text-lg">{location.name}</h3>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getAQIColor(location.aqi) }}
                  ></div>
                  <span className="text-xl font-bold">{location.aqi}</span>
                  <span className="text-gray-600">AQI</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[1000]">
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
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[1000]">
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
