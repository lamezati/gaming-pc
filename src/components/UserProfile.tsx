import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiLogOut, FiX } from 'react-icons/fi';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setError('');
    setLoading(true);
    
    try {
      await logOut();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <FiX className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="h-20 w-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
            <FiUser className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mt-4">Your Profile</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{currentUser?.email}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Account Status</p>
            <p className="font-medium">Active</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email Verification</p>
            <p className="font-medium">
              {currentUser?.emailVerified ? (
                <span className="text-green-600">Verified</span>
              ) : (
                <span className="text-yellow-600">Not Verified</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiLogOut className="w-5 h-5" />
            <span>{loading ? 'Logging out...' : 'Sign Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;