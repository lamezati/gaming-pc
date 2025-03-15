import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiMail, FiX, FiKey } from 'react-icons/fi';
import { auth } from '../firebase/config';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

interface ResetPasswordProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onClose, onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      // Check if the email exists in Firebase Auth
      const methods = await fetchSignInMethodsForEmail(auth, email);
      
      if (methods.length === 0) {
        // Email doesn't exist in the database
        setError('No account found with this email address. Please check your email or create a new account.');
        setLoading(false);
        return;
      }
      
      // Email exists, proceed with password reset
      await resetPassword(email);
      setMessage('Check your email for password reset instructions');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
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
          <FiKey className="w-12 h-12 mx-auto text-blue-600" />
          <h2 className="text-2xl font-bold mt-2">Reset Password</h2>
          <p className="text-gray-600 mt-1">We'll send you reset instructions</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Checking...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;