
import React from 'react';
import { MapPin, Clock, Phone, Star, Flag, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Resource {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  hours: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  lastVerified: string;
  tags: string[];
}

interface ResourceCardProps {
  resource: Resource;
  userRole?: 'admin' | 'contributor' | 'public' | null;
  onEdit?: (id: string) => void;
  onFlag?: (id: string) => void;
  onRate?: (id: string, rating: number) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  userRole,
  onEdit,
  onFlag,
  onRate
}) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'food-assistance': 'bg-green-100 text-green-800',
      'mental-health-services': 'bg-purple-100 text-purple-800',
      'housing-support': 'bg-blue-100 text-blue-800',
      'legal-aid': 'bg-yellow-100 text-yellow-800',
      'job-training': 'bg-orange-100 text-orange-800',
      'healthcare': 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
            {resource.verified && (
              <CheckCircle className="w-5 h-5 text-green-600" title="Verified Resource" />
            )}
          </div>
          <Badge className={getCategoryColor(resource.category)}>
            {resource.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Badge>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{resource.rating}</span>
          <span className="text-sm text-gray-500">({resource.reviewCount})</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 line-clamp-2">{resource.description}</p>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{resource.address}</span>
        </div>
        
        {resource.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{resource.phone}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{resource.hours}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          {resource.website && (
            <Button variant="outline" size="sm">
              Visit Website
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Verification Status */}
          {!resource.verified && (
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <AlertCircle className="w-3 h-3" />
              <span>Unverified</span>
            </div>
          )}
          
          {/* Last Verified */}
          <div className="text-xs text-gray-500">
            Last verified: {resource.lastVerified}
          </div>
          
          {/* User Actions */}
          {userRole && (
            <div className="flex gap-1">
              {(userRole === 'admin' || userRole === 'contributor') && onEdit && (
                <Button variant="ghost" size="sm" onClick={() => onEdit(resource.id)}>
                  Edit
                </Button>
              )}
              {onFlag && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFlag(resource.id)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  <Flag className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
