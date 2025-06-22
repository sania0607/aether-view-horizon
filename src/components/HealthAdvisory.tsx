
import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Users, Activity } from 'lucide-react';

interface HealthAdvisoryProps {
  aqi: number;
  location: string;
}

const HealthAdvisory: React.FC<HealthAdvisoryProps> = ({ aqi, location }) => {
  const getHealthInfo = (aqi: number) => {
    if (aqi <= 50) {
      return {
        level: 'Good',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: Shield,
        iconColor: 'text-green-600',
        recommendations: [
          'Perfect for outdoor activities',
          'Great day for jogging or cycling',
          'Open windows for fresh air',
          'Ideal for children to play outside'
        ],
        sensitiveGroups: 'No health concerns for any group',
        activities: {
          outdoor: 'Excellent',
          exercise: 'Recommended',
          windows: 'Open freely'
        }
      };
    } else if (aqi <= 100) {
      return {
        level: 'Moderate',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: Shield,
        iconColor: 'text-yellow-600',
        recommendations: [
          'Generally safe for outdoor activities',
          'Sensitive individuals may experience minor irritation',
          'Consider reducing prolonged outdoor exertion',
          'Monitor air quality if you have respiratory conditions'
        ],
        sensitiveGroups: 'People with heart or lung disease, older adults, and children should be cautious',
        activities: {
          outdoor: 'Good',
          exercise: 'Moderate intensity ok',
          windows: 'Consider partially open'
        }
      };
    } else if (aqi <= 150) {
      return {
        level: 'Unhealthy for Sensitive Groups',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: AlertTriangle,
        iconColor: 'text-orange-600',
        recommendations: [
          'Limit prolonged outdoor activities',
          'Sensitive groups should avoid outdoor exertion',
          'Consider wearing a mask if you must go outside',
          'Keep windows closed and use air purifier'
        ],
        sensitiveGroups: 'People with heart/lung disease, older adults, children, and athletes should limit outdoor activities',
        activities: {
          outdoor: 'Limited',
          exercise: 'Indoor preferred',
          windows: 'Keep closed'
        }
      };
    } else if (aqi <= 200) {
      return {
        level: 'Unhealthy',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        iconColor: 'text-red-600',
        recommendations: [
          'Avoid all outdoor activities',
          'Wear N95 mask if you must go outside',
          'Keep windows and doors closed',
          'Use air purifier indoors',
          'Postpone outdoor exercise'
        ],
        sensitiveGroups: 'Everyone should limit outdoor activities. Sensitive groups should avoid going outside.',
        activities: {
          outdoor: 'Avoid',
          exercise: 'Indoor only',
          windows: 'Sealed shut'
        }
      };
    } else if (aqi <= 300) {
      return {
        level: 'Very Unhealthy',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        icon: AlertTriangle,
        iconColor: 'text-purple-600',
        recommendations: [
          'Stay indoors at all times',
          'Avoid any outdoor exposure',
          'Wear N95 or P100 mask if emergency outdoor exposure',
          'Use multiple air purifiers',
          'Seal all windows and doors'
        ],
        sensitiveGroups: 'Everyone should avoid outdoor activities and stay indoors',
        activities: {
          outdoor: 'Emergency only',
          exercise: 'Light indoor only',
          windows: 'Completely sealed'
        }
      };
    } else {
      return {
        level: 'Hazardous',
        color: 'text-red-900',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300',
        icon: AlertTriangle,
        iconColor: 'text-red-900',
        recommendations: [
          'Emergency conditions - stay indoors',
          'Avoid all outdoor exposure',
          'Use highest grade air filtration',
          'Consider evacuation if possible',
          'Seek medical attention if experiencing symptoms'
        ],
        sensitiveGroups: 'Health emergency - everyone should remain indoors and avoid physical activities',
        activities: {
          outdoor: 'Dangerous',
          exercise: 'Postpone all activities',
          windows: 'Emergency seal'
        }
      };
    }
  };

  const healthInfo = getHealthInfo(aqi);
  const IconComponent = healthInfo.icon;

  return (
    <div className="space-y-4">
      {/* Main Advisory Card */}
      <Card className={`p-6 ${healthInfo.bgColor} ${healthInfo.borderColor} border-2 shadow-xl`}>
        <div className="flex items-center space-x-3 mb-4">
          <IconComponent className={`w-6 h-6 ${healthInfo.iconColor}`} />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Health Advisory</h2>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className={`text-lg font-semibold ${healthInfo.color} mb-2`}>
            {healthInfo.level}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{aqi} AQI</div>
        </div>

        <Alert className={`${healthInfo.bgColor} ${healthInfo.borderColor} border`}>
          <Users className={`h-4 w-4 ${healthInfo.iconColor}`} />
          <AlertDescription className="text-sm">
            {healthInfo.sensitiveGroups}
          </AlertDescription>
        </Alert>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          Recommendations
        </h3>
        
        <div className="space-y-3">
          {healthInfo.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{rec}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Guidelines */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Guidelines</h3>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Outdoor Activities</span>
            <span className={`text-sm font-semibold ${healthInfo.color}`}>
              {healthInfo.activities.outdoor}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Exercise</span>
            <span className={`text-sm font-semibold ${healthInfo.color}`}>
              {healthInfo.activities.exercise}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Windows</span>
            <span className={`text-sm font-semibold ${healthInfo.color}`}>
              {healthInfo.activities.windows}
            </span>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts (for severe conditions) */}
      {aqi > 150 && (
        <Card className="p-4 bg-red-50 border-red-200 border shadow-xl">
          <h4 className="font-semibold text-red-800 mb-2">Emergency Information</h4>
          <div className="text-sm text-red-700 space-y-1">
            <p>• If experiencing breathing difficulties, seek medical attention</p>
            <p>• Emergency services: 911</p>
            <p>• Poison control: 1-800-222-1222</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HealthAdvisory;
