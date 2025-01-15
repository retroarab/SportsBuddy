import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getVenues } from '~/components/api/api';
import { useColorScheme } from '~/lib/useColorScheme';

export default function VenuesScreen() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venues:', error);
        Alert.alert('Error', 'Failed to load venues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${isDarkColorScheme ? 'bg-black' : 'bg-white'}`}>
        <ActivityIndicator size="large" color="#22C55E" />
        <Text className={`mt-4 ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>Loading venues...</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 p-4 ${isDarkColorScheme ? 'bg-black' : 'bg-white'}`}>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.venue_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/venue-details?id=${item.venue_id}`)}
            className={`p-4 rounded-lg mb-4 shadow-md ${
              isDarkColorScheme ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <Text className={`text-lg font-bold ${isDarkColorScheme ? 'text-white' : 'text-black'}`}>
              {item.name}
            </Text>
            <Text className={`${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.location}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className={`text-center ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
            No venues available
          </Text>
        }
      />
    </View>
  );
}
