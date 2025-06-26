
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchFilters } from '@/components/SearchFilters';
import { ResourceCard } from '@/components/ResourceCard';
import { RoleBasedView } from '@/components/RoleBasedView';
import { toast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'contributor' | 'public' | null;

const mockResources = [
  {
    id: '1',
    name: 'Downtown Food Bank',
    category: 'Food Assistance',
    description: 'Provides free groceries and hot meals to families in need. No documentation required, open to all community members.',
    address: '123 Main Street',
    city: 'Downtown',
    zipCode: '12345',
    phone: '(555) 123-4567',
    website: 'https://downtownfoodbank.org',
    hours: 'Mon-Fri: 9am-5pm, Sat: 10am-2pm',
    isVerified: true,
    rating: 4.8,
    reviewCount: 127,
    lastUpdated: '2 days ago',
    tags: ['Free', 'No ID Required', 'Multilingual Staff']
  },
  {
    id: '2',
    name: 'Community Mental Health Center',
    category: 'Mental Health',
    description: 'Comprehensive mental health services including counseling, therapy, and crisis intervention. Sliding scale fees available.',
    address: '456 Oak Avenue',
    city: 'Midtown',
    zipCode: '12346',
    phone: '(555) 987-6543',
    hours: 'Mon-Fri: 8am-6pm, Emergency: 24/7',
    isVerified: true,
    rating: 4.6,
    reviewCount: 89,
    lastUpdated: '1 week ago',
    tags: ['Sliding Scale', '24/7 Crisis Line', 'Multiple Languages']
  },
  {
    id: '3',
    name: 'Housing First Initiative',
    category: 'Housing',
    description: 'Emergency housing assistance, rental support, and long-term housing placement services for individuals and families.',
    address: '789 Pine Street',
    city: 'Eastside',
    zipCode: '12347',
    phone: '(555) 456-7890',
    hours: 'Mon-Fri: 9am-4pm',
    isVerified: false,
    rating: 4.2,
    reviewCount: 34,
    lastUpdated: '3 weeks ago',
    tags: ['Emergency Shelter', 'Rental Assistance', 'Case Management']
  },
  {
    id: '4',
    name: 'Legal Aid Society',
    category: 'Legal Aid',
    description: 'Free legal services for low-income residents including housing disputes, immigration, and family law matters.',
    address: '321 Elm Street',
    city: 'Westside',
    zipCode: '12348',
    phone: '(555) 321-0987',
    hours: 'Tue-Thu: 10am-3pm, By appointment',
    isVerified: true,
    rating: 4.9,
    reviewCount: 156,
    lastUpdated: '5 days ago',
    tags: ['Free Legal Aid', 'Immigration Services', 'Appointment Required']
  }
];

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [resources, setResources] = useState(mockResources);
  const [filteredResources, setFilteredResources] = useState(mockResources);

  const handleLogin = () => {
    // Simulate login - in real app this would be handled by auth system
    const roles: UserRole[] = ['admin', 'contributor', 'public'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    setUserRole(randomRole);
    toast({
      title: "Login Successful",
      description: `Logged in as ${randomRole}`,
    });
  };

  const handleLogout = () => {
    setUserRole(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const handleSearch = (filters: any) => {
    let filtered = [...resources];
    
    if (filters.query) {
      filtered = filtered.filter(resource => 
        resource.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        resource.description.toLowerCase().includes(filters.query.toLowerCase())
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(resource => resource.category === filters.category);
    }
    
    if (filters.verified === 'verified') {
      filtered = filtered.filter(resource => resource.isVerified);
    } else if (filters.verified === 'unverified') {
      filtered = filtered.filter(resource => !resource.isVerified);
    }
    
    setFilteredResources(filtered);
    
    toast({
      title: "Search Results",
      description: `Found ${filtered.length} resources`,
    });
  };

  const handleVerify = (id: string) => {
    toast({
      title: "Resource Verified",
      description: "Thank you for verifying this resource",
    });
  };

  const handleFlag = (id: string) => {
    toast({
      title: "Resource Flagged",
      description: "Thank you for helping keep our resources accurate",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole={userRole} onLogin={handleLogin} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Community Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting you with local food assistance, mental health services, housing support, 
            legal aid, job training, and more. All resources are community-verified and regularly updated.
          </p>
        </div>

        {/* Role-based Dashboard */}
        {userRole && <RoleBasedView userRole={userRole} />}

        {/* Search and Filters */}
        <SearchFilters onSearch={handleSearch} />

        {/* Results Summary */}
        <div className="flex justify-between items-center my-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Available Resources ({filteredResources.length})
          </h2>
          <div className="text-sm text-gray-600">
            Showing results for your area
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              userRole={userRole}
              onFlag={handleFlag}
              onVerify={handleVerify}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Help Build a Stronger Community
          </h3>
          <p className="text-lg mb-6">
            Know of a resource that's not listed? Help others by adding it to our database.
          </p>
          <div className="flex gap-4 justify-center">
            {userRole ? (
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Add a Resource
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Join as Contributor
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Community Hub</h4>
              <p className="text-gray-300">
                Connecting communities with vital resources for a stronger, more supportive society.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Food Assistance</a></li>
                <li><a href="#" className="hover:text-white">Mental Health</a></li>
                <li><a href="#" className="hover:text-white">Housing Support</a></li>
                <li><a href="#" className="hover:text-white">Legal Aid</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Become a Contributor</a></li>
                <li><a href="#" className="hover:text-white">Verify Resources</a></li>
                <li><a href="#" className="hover:text-white">Report Issues</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Email: help@communityhub.org</li>
                <li>Phone: (555) 123-4567</li>
                <li>Emergency: 911</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Community Resource Hub. Built with care for our community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
