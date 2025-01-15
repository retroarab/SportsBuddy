import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getVenueDetails } from '~/components/api/api';
import { useColorScheme } from '~/lib/useColorScheme';

export default function VenueDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkColorScheme } = useColorScheme();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const data = await getVenueDetails(id);
        setVenue(data);
      } catch (error) {
        console.error('Error fetching venue details:', error);
        Alert.alert('Error', 'Failed to load venue details.');
      } finally {
        setLoading(false);
      }
    };
    fetchVenueDetails();
  }, [id]);

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${isDarkColorScheme ? 'bg-black' : 'bg-white'}`}>
        <ActivityIndicator size="large" color="#22C55E" />
        <Text className={`mt-4 ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
          Loading venue details...
        </Text>
      </View>
    );
  }

  if (!venue) {
    return (
      <View className={`flex-1 justify-center items-center ${isDarkColorScheme ? 'bg-black' : 'bg-white'}`}>
        <Text className={`text-lg font-bold ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
          Venue not found
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 p-6 ${isDarkColorScheme ? 'bg-black' : 'bg-white'}`}>
      <Text className={`text-3xl font-extrabold ${isDarkColorScheme ? 'text-white' : 'text-black'}`}>
        {venue.name}
      </Text>
      <Text className={`text-lg mt-2 ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
        {venue.location}
      </Text>
      <Text className={`text-lg mt-4 ${isDarkColorScheme ? 'text-white' : 'text-black'}`}>
        Sport: {venue.sport}
      </Text>
      <Text className={`text-lg mt-4 ${isDarkColorScheme ? 'text-white' : 'text-black'}`}>
        Cost: ${venue.rentalCost}
      </Text>
      <Text className={`text-lg mt-4 ${isDarkColorScheme ? 'text-white' : 'text-black'}`}>
        Contact: {venue.contactInfo}
      </Text>
    </View>
  );
}
