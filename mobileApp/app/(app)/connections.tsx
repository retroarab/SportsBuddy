import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSession } from '~/components/api/ctx';
import {
  searchUsers,
  getConnections,
  sendFriendRequest,
  respondToFriendRequest,
  getPendingRequests,
} from '~/components/api/api';

export default function ConnectionsScreen() {
  const { session } = useSession();
  const [connections, setConnections] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchConnections();
    fetchPendingRequests();
  }, []);

  const fetchConnections = async () => {
    try {
      console.log('Debug: Fetching connections');
      const data = await getConnections(session.user.id, session.token);
      console.log('Debug: Connections data:', data);
      setConnections(data);
    } catch (error) {
      console.error('Error fetching connections:', error);
      Alert.alert('Error', 'Failed to load connections.');
    }
  };

  const fetchPendingRequests = async () => {
    try {
      console.log('Debug: Fetching pending requests');
      const data = await getPendingRequests(session.user.id, session.token);
      console.log('Debug: Pending requests data:', data);
      setPendingRequests(data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      Alert.alert('Error', 'Failed to load pending requests.');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Search query cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      console.log(`Debug: Searching users with query: "${searchQuery}"`);
      const results = await searchUsers(searchQuery, session.token);
      console.log('Debug: Search results:', results);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
      Alert.alert('Error', 'Failed to search users.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (userId: number) => {
    try {
      console.log('Debug: Sending friend request to user ID:', userId);
      const response = await sendFriendRequest(session.user.id, userId, session.token);
      console.log('Debug: Friend request response:', response);
      Alert.alert('Success', 'Friend request sent.');
    } catch (error) {
      console.error('Error sending friend request:', error);
      Alert.alert('Error', 'Failed to send friend request.');
    }
  };

  const handleRespondToRequest = async (requestId: number, status: 'accept' | 'reject') => {
    try {
      console.log('Debug: Responding to request ID:', requestId, 'Status:', status);
      await respondToFriendRequest(requestId, status, session.token);
      Alert.alert('Success', `Friend request ${status === 'accept' ? 'accepted' : 'rejected'}.`);
      fetchPendingRequests();
      fetchConnections();
    } catch (error) {
      console.error(`Error responding to request (${status}):`, error);
      Alert.alert('Error', 'Failed to respond to friend request.');
    }
  };

  return (
    <View className="flex-1 bg-background p-4">
      {/* Search Bar */}
      <View className="flex-row bg-gray-800 rounded-lg p-2 mb-4">
        <TextInput
          placeholder="Search for users..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-white text-base px-4"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={handleSearch}
          disabled={loading}
          className="bg-green-600 p-3 rounded-lg ml-2 flex items-center justify-center"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text className="text-white font-bold">Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg text-white font-bold mb-2">Search Results</Text>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={({ item }) => (
              <View className="bg-gray-800 rounded-lg p-4 mb-2">
                <Text className="text-white text-base">{item.username}</Text>
                <Text className="text-gray-400 text-sm">{item.email}</Text>
                <TouchableOpacity
                  onPress={() => handleSendRequest(item.user_id)}
                  className="bg-green-600 p-2 rounded-lg mt-2 items-center"
                >
                  <Text className="text-white font-bold">Send Friend Request</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text className="text-gray-400 text-center">No results found</Text>}
          />
        </View>
      )}

      {/* Pending Friend Requests */}
      <Text className="text-lg text-white font-bold mb-2">Pending Friend Requests</Text>
      <FlatList
        data={pendingRequests}
        keyExtractor={(item) => item.friend_id.toString()}
        renderItem={({ item }) => (
          <View className="bg-gray-800 rounded-lg p-4 mb-2">
            <Text className="text-white text-base">{item.username}</Text>
            <View className="flex-row mt-2">
              <TouchableOpacity
                className="flex-1 bg-green-600 p-2 rounded-lg mr-2 items-center"
                onPress={() => handleRespondToRequest(item.friend_id, 'accept')}
              >
                <Text className="text-white font-bold">Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-red-600 p-2 rounded-lg items-center"
                onPress={() => handleRespondToRequest(item.friend_id, 'reject')}
              >
                <Text className="text-white font-bold">Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text className="text-gray-400 text-center">No pending requests</Text>}
      />

      {/* Friend List */}
      <Text className="text-lg text-white font-bold mt-4 mb-2">Your Friends</Text>
      <FlatList
        data={connections}
        keyExtractor={(item) => item.friend_id.toString()}
        renderItem={({ item }) => (
          <View className="bg-gray-800 rounded-lg p-4 mb-2">
            <Text className="text-white text-base">{item.friend?.username}</Text>
          </View>
        )}
        ListEmptyComponent={<Text className="text-gray-400 text-center">No connections yet</Text>}
      />
    </View>
  );
}
