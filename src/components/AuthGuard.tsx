import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Auth, { AuthMode } from './Auth';
import { FiLock } from 'react-icons/fi';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SignIn);

  // If still loading auth state, show a loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is authenticated, show children components
  if (currentUser) {
    return <>{children}</>;
  }

  // If user is not authenticated, show the authentication screen
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Gaming PC Builder</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="bg-blue-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
              <FiLock className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">Authentication Required</h2>
            <p className="mt-2 text-gray-600">
              Please sign in or create an account to access Gaming PC Builder.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setAuthMode(AuthMode.SignIn)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode(AuthMode.SignUp)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      <Auth mode={authMode} onClose={() => setAuthMode(authMode === AuthMode.SignIn ? AuthMode.SignUp : AuthMode.SignIn)} />
    </div>
  );
};

export default AuthGuard;