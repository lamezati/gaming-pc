import { db } from './config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { UserPreferences } from '../types';

// Create a new user profile when they sign up
export const createUserProfile = async (user: User): Promise<void> => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    // Only create if it doesn't already exist
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date(),
        lastLogin: new Date(),
        preferences: {
          buildType: '',
          budget: 1500,
          primaryUse: '',
          preferredGames: [],
        },
        savedBuilds: [],
      });
    } else {
      // Update the last login time
      await updateDoc(userRef, {
        lastLogin: new Date()
      });
    }
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Get user preferences
export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.preferences as UserPreferences;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return null;
  }
};

// Save user preferences
export const saveUserPreferences = async (userId: string, preferences: UserPreferences): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      preferences: preferences
    });
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw error;
  }
};

// Save a build to user's saved builds
export const saveBuild = async (userId: string, buildId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const savedBuilds = userData.savedBuilds || [];
      
      // Only add if not already in the list
      if (!savedBuilds.includes(buildId)) {
        savedBuilds.push(buildId);
        await updateDoc(userRef, {
          savedBuilds: savedBuilds
        });
      }
    }
  } catch (error) {
    console.error('Error saving build:', error);
    throw error;
  }
};

// Remove a build from user's saved builds
export const removeSavedBuild = async (userId: string, buildId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const savedBuilds = userData.savedBuilds || [];
      
      const updatedBuilds = savedBuilds.filter((id: string) => id !== buildId);
      await updateDoc(userRef, {
        savedBuilds: updatedBuilds
      });
    }
  } catch (error) {
    console.error('Error removing saved build:', error);
    throw error;
  }
};