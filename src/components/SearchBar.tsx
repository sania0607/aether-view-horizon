
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

interface Location {
  name: string;
  lat: number;
  lng: number;
  aqi: number;
}

interface SearchBarProps {
  onLocationSelect: (location: Location) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const sampleLocations = [
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 1) {
      const filtered = sampleLocations.filter(location =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSearchQuery(location.name);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-red-900';
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search cities..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white/90 backdrop-blur-sm"
          onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
          {suggestions.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(location)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                <span className="text-gray-900">{location.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getAQIColor(location.aqi)}`}></div>
                <span className="text-sm font-medium text-gray-600">{location.aqi}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
