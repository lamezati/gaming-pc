import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  requireVerification?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireVerification = false }) => {
  const { user, loading } = useAuth();

  // Show loading state while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If email verification is required and the user's email is not verified,
  // redirect to the verify-email page
  if (requireVerification && !user.emailVerified) {
    return <Navigate to="/verify-email" />;
  }

  // Render the child routes
  return <Outlet />;
};

export default ProtectedRoute;