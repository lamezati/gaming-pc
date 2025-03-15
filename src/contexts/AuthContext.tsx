import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUserProfile } from '../firebase/userProfile';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sign up with email and password
  const signUp = (email: string, password: string): Promise<User> => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Create user profile in Firestore
        createUserProfile(userCredential.user).catch(err => {
          console.error("Error creating user profile:", err);
        });
        return userCredential.user;
      });
  };

  // Sign in with email and password
  const signIn = (email: string, password: string): Promise<User> => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential.user);
  };

  // Sign in with Google
  const signInWithGoogle = (): Promise<User> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        // Create or update user profile in Firestore
        createUserProfile(result.user).catch(err => {
          console.error("Error creating user profile for Google sign-in:", err);
        });
        return result.user;
      });
  };

  // Log out
  const logOut = (): Promise<void> => {
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    logOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
