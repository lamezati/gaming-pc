import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Monitor, Menu, X, LogOut, User, ChevronLeft, Home } from 'lucide-react';
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
    <nav className="mobile-nav-container">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Monitor className="w-6 h-6 text-blue-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">Gaming PC Builder</h1>
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
              className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1 border-t border-gray-200 mt-2">
              <Link 
                to="/"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
                Home
              </Link>
              
              {currentUser && (
                <div>
                  <div className="flex items-center px-3 py-2 text-base font-medium text-gray-500">
                    <User className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
                    <span className="truncate max-w-[200px]">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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