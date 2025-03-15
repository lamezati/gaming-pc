import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase/config';
import { sendEmailVerification } from 'firebase/auth';
import { FiMail, FiAlertTriangle, FiCheckCircle, FiX } from 'react-icons/fi';

const EmailVerificationAlert: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dismissed, setDismissed] = useState(false);

  // Don't show anything if user is verified or no user or user dismissed the alert
  if (!currentUser || currentUser.emailVerified || dismissed) {
    return null;
  }

  const handleSendVerification = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await sendEmailVerification(auth.currentUser!);
      setSuccess(true);
      // Auto-dismiss after 5 seconds
      setTimeout(() => setDismissed(true), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 p-4 rounded-md mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <FiAlertTriangle className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <div>
            <p className="text-sm text-yellow-700">
              Your email address has not been verified. Please verify your email to access all features.
            </p>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            {success && (
              <div className="mt-2 flex items-center text-sm text-green-600">
                <FiCheckCircle className="mr-1.5 h-4 w-4" />
                <p>Verification email sent! Please check your inbox.</p>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center md:mt-0 md:ml-6">
            <button
              onClick={handleSendVerification}
              disabled={loading || success}
              className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : success ? (
                <span className="flex items-center">
                  <FiCheckCircle className="mr-1.5 h-4 w-4" />
                  Sent
                </span>
              ) : (
                <span className="flex items-center">
                  <FiMail className="mr-1.5 h-4 w-4" />
                  Send Verification
                </span>
              )}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="ml-2 inline-flex items-center rounded-md bg-transparent p-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Dismiss"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationAlert;