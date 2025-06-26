
import React from 'react';
import { Users, CheckCircle, Flag, Plus, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleBasedViewProps {
  userRole: 'admin' | 'contributor' | 'public';
}

export const RoleBasedView: React.FC<RoleBasedViewProps> = ({ userRole }) => {
  if (userRole === 'admin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Requires review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Resources</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>

        <div className="col-span-full">
          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Settings className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline">
              <Flag className="w-4 h-4 mr-2" />
              Review Flagged Items
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'contributor') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Contributions</CardTitle>
            <CardDescription>Resources you've added or verified</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">47</div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>34 Added</span>
              <span>13 Verified</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Contribute to the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Resource
            </Button>
            <Button variant="outline" className="w-full">
              <CheckCircle className="w-4 h-4 mr-2" />
              Verify Resources
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Public user view
  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-8">
      <div className="text-center">
        <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Join Our Community
        </h3>
        <p className="text-gray-700 mb-4">
          Create an account to contribute resources, verify information, and help build a stronger community.
        </p>
        <div className="flex gap-3 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Sign Up as Contributor
          </Button>
          <Button variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};
