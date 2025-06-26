
import React from 'react';
import { MapPin, Clock, CheckCircle, Flag, Star, Phone, Globe, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Resource {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  zipCode: string;
  phone?: string;
  website?: string;
  hours: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  lastUpdated: string;
  tags: string[];
}

interface ResourceCardProps {
  resource: Resource;
  userRole?: 'admin' | 'contributor' | 'public' | null;
  onFlag?: (resourceId: string) => void;
  onVerify?: (resourceId: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ 
  resource, 
  userRole, 
  onFlag, 
  onVerify 
}) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Food Assistance': 'bg-green-100 text-green-800',
      'Mental Health': 'bg-blue-100 text-blue-800',
      'Housing': 'bg-purple-100 text-purple-800',
      'Legal Aid': 'bg-red-100 text-red-800',
      'Job Training': 'bg-orange-100 text-orange-800',
      'Healthcare': 'bg-teal-100 text-teal-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getCategoryColor(resource.category)}>
            {resource.category}
          </Badge>
          {resource.isVerified && (
            <CheckCircle className="w-5 h-5 text-green-600" />
          )}
        </div>
        <CardTitle className="text-lg">{resource.name}</CardTitle>
        <CardDescription className="text-sm">
          {resource.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Location */}
        <div className="flex items-start space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{resource.address}, {resource.city} {resource.zipCode}</span>
        </div>

        {/* Hours */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>{resource.hours}</span>
        </div>

        {/* Contact Info */}
        <div className="space-y-1">
          {resource.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{resource.phone}</span>
            </div>
          )}
          {resource.website && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="w-4 h-4 flex-shrink-0" />
              <a 
                href={resource.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {renderStars(resource.rating)}
          </div>
          <span className="text-sm text-gray-600">
            {resource.rating.toFixed(1)} ({resource.reviewCount} reviews)
          </span>
        </div>

        {/* Tags */}
        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Last Updated */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>Updated {resource.lastUpdated}</span>
        </div>

        {/* Action Buttons */}
        {userRole && userRole !== 'public' && (
          <div className="flex space-x-2 pt-2">
            {!resource.isVerified && userRole === 'contributor' && onVerify && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onVerify(resource.id)}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Verify
              </Button>
            )}
            {onFlag && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onFlag(resource.id)}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Flag className="w-4 h-4 mr-1" />
                Flag
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
