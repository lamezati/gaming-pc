import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import { useAuth } from '../contexts/AuthContext';

export enum AuthMode {
  SignIn,
  SignUp,
  ResetPassword,
  Closed
}

interface AuthProps {
  mode: AuthMode;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onClose }) => {
  const [currentMode, setCurrentMode] = useState<AuthMode>(mode);
  const { currentUser } = useAuth();
  
  // If user logs in, close the auth modal
  useEffect(() => {
    if (currentUser) {
      onClose();
    }
  }, [currentUser, onClose]);
  
  // Update current mode when prop changes
  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  if (currentMode === AuthMode.Closed) {
    return null;
  }

  return (
    <>
      {currentMode === AuthMode.SignIn && (
        <SignIn
          onClose={onClose}
          onSwitchToSignUp={() => setCurrentMode(AuthMode.SignUp)}
          onSwitchToReset={() => setCurrentMode(AuthMode.ResetPassword)}
        />
      )}
      
      {currentMode === AuthMode.SignUp && (
        <SignUp
          onClose={onClose}
          onSwitchToSignIn={() => setCurrentMode(AuthMode.SignIn)}
        />
      )}
      
      {currentMode === AuthMode.ResetPassword && (
        <ResetPassword
          onClose={onClose}
          onSwitchToSignIn={() => setCurrentMode(AuthMode.SignIn)}
        />
      )}
    </>
  );
};

export default Auth;