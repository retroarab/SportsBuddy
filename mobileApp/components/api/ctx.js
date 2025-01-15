import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetails } from './api';
import { View, ActivityIndicator, Text } from 'react-native'; // Import required components
const AuthContext = createContext();

export const useSession = () => useContext(AuthContext);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      console.log('Debug: Loading session from AsyncStorage');
      const storedSession = await AsyncStorage.getItem('session');
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        console.log('Debug: Parsed session from storage:', parsedSession);

        if (parsedSession.token) {
          try {
            const userDetails = await getUserDetails(parsedSession.user?.user_id, parsedSession.token);
            console.log('Debug: Fetched user details:', userDetails);
            setSession({ token: parsedSession.token, user: userDetails });
          } catch (error) {
            console.error('Failed to fetch user details during session load:', error);
            signOut();
          }
        } else {
          console.error('Debug: No token found in session, signing out');
          signOut();
        }
      }
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const signIn = (sessionData) => {
    console.log('Debug: sessionData passed to signIn:', sessionData);
  
    if (sessionData?.token && sessionData?.user) {
      // Ensure session.user.id is populated correctly
      const { token, user } = sessionData;
      if (!user.user_id) {
        console.error('Debug: Missing user_id in sessionData.user:', user);
      }
      setSession({ token, user: { ...user, id: user.user_id } }); // Map user_id to id
      AsyncStorage.setItem('session', JSON.stringify({ token, user: { ...user, id: user.user_id } }))
        .then(() => console.log('Debug: Session saved to AsyncStorage'))
        .catch((err) => console.error('Error saving session to AsyncStorage:', err));
    } else {
      console.error('Invalid session data provided to signIn:', sessionData);
    }
  };
  
  const signOut = async () => {
    console.log('Debug: Signing out');
    setSession(null);
    try {
      await AsyncStorage.removeItem('session');
      console.log('Debug: Session removed from AsyncStorage');
    } catch (err) {
      console.error('Error removing session from AsyncStorage:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#22C55E" />
          <Text>Loading...</Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
