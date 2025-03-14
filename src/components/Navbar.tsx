import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Monitor, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    setError('');
    
    try {
      await signOut();
      navigate('/signin');
    } catch (err) {
      setError('Failed to log out');
      console.error(err);
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Monitor className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Gaming PC Builder</h1>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser && (
              <>
                <span className="text-gray-600 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {currentUser.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pt-2 border-t">
            {currentUser && (
              <div className="space-y-1">
                <div className="text-gray-600 py-2 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {currentUser.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center text-gray-600 hover:text-blue-600 px-2 py-2 rounded-md"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
      </div>
    </nav>
  );
}