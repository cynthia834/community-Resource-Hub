
import React, { useState } from 'react';
import { Search, Menu, X, User, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  userRole?: 'admin' | 'contributor' | 'public' | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userRole, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700">Community Hub</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Browse Resources</a>
            <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">About</a>
            {userRole && (
              <>
                {userRole === 'admin' && (
                  <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Admin Dashboard</a>
                )}
                {(userRole === 'admin' || userRole === 'contributor') && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                )}
              </>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {userRole ? (
              <div className="flex items-center space-x-3">
                {userRole !== 'public' && (
                  <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-700" />
                )}
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700 capitalize">{userRole}</span>
                </div>
                <Button variant="outline" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLogin}>
                Login / Sign Up
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Browse Resources</a>
              <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">About</a>
              {userRole && (
                <>
                  {userRole === 'admin' && (
                    <a href="#" className="text-gray-700 hover:text-blue-700 font-medium">Admin Dashboard</a>
                  )}
                  {(userRole === 'admin' || userRole === 'contributor') && (
                    <Button className="bg-green-600 hover:bg-green-700 w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Resource
                    </Button>
                  )}
                </>
              )}
              <div className="pt-2 border-t border-gray-200">
                {userRole ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700 capitalize">{userRole}</span>
                    </div>
                    <Button variant="outline" onClick={onLogout} className="w-full">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button onClick={onLogin} className="w-full">
                    Login / Sign Up
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
