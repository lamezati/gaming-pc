import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const EmailVerificationReminder: React.FC = () => {
  const { user, sendVerificationEmail } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // If no user is logged in or email is already verified, don't show the banner
  if (!user || user.emailVerified) {
    return null;
  }

  const handleSendVerification = async () => {
    try {
      setIsSending(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      await sendVerificationEmail();
      setSuccessMessage('Verification email sent!');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to send verification email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please verify your email address to access all features.
              {successMessage && (
                <span className="ml-2 text-green-600">{successMessage}</span>
              )}
              {errorMessage && (
                <span className="ml-2 text-red-600">{errorMessage}</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center mt-2 sm:mt-0">
          <Link
            to="/verify-email"
            className="mr-3 text-sm font-medium text-yellow-700 hover:text-yellow-600"
          >
            View Details
          </Link>
          <button
            onClick={handleSendVerification}
            disabled={isSending}
            className="px-3 py-1 text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Resend Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationReminder;