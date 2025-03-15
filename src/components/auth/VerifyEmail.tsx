import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const { user, sendVerificationEmail, logout } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user's email is already verified, redirect to home
  if (user.emailVerified) {
    return <Navigate to="/" />;
  }

  const handleSendVerification = async () => {
    try {
      setIsSending(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      await sendVerificationEmail();
      setSuccessMessage('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to send verification email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Verify Your Email</h2>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            A verification email has been sent to <span className="font-medium text-gray-900">{user.email}</span>. 
            Please check your inbox and click the verification link.
          </p>
          <p className="mt-2 text-gray-600">
            After verifying your email, please refresh this page or log back in.
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={handleSendVerification}
            disabled={isSending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Resend Verification Email'}
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;