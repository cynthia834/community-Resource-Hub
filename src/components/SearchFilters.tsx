
import React, { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState('');
  const [verified, setVerified] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    'Food Assistance',
    'Mental Health Services',
    'Housing Support',
    'Legal Aid',
    'Job Training',
    'Healthcare',
    'Education',
    'Transportation',
    'Utilities Assistance',
    'Childcare'
  ];

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      location,
      category,
      availability,
      verified
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setCategory('');
    setAvailability('');
    setVerified('');
    onSearch({});
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search for resources, services, or organizations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="City or ZIP code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 md:w-48"
          />
        </div>
        <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Advanced Filters
        </Button>

        {(searchQuery || location || category || availability || verified) && (
          <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open-now">Open Now</SelectItem>
                <SelectItem value="weekdays">Weekdays</SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
                <SelectItem value="24-7">24/7</SelectItem>
              </SelectContent>
            </Select>

            <Select value={verified} onValueChange={setVerified}>
              <SelectTrigger>
                <SelectValue placeholder="Verification Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
                <SelectItem value="all">All Resources</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="free-resources"
                className="rounded border-gray-300"
              />
              <label htmlFor="free-resources" className="text-sm text-gray-700">
                Free resources only
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
