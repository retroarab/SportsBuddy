import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '~/components/ui/dropdown-menu';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { useSession } from '~/components/api/ctx';
import { getUserDetails } from '~/components/api/api';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const { session, signOut } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.token || !session?.user) {
      console.error('Invalid session:', session);
      handleSignOut();
      return;
    }
    fetchUserData();
  }, [session]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userDetails = await getUserDetails(session.user.id, session.token);
      setUserData(userDetails);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', error.error || 'Failed to fetch user data.');
      handleSignOut();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    router.replace('../login');
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#22C55E" />
        <Text className="text-lg mt-4">Loading your dashboard...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-lg text-red-600">Failed to load user data.</Text>
        <Button
          onPress={fetchUserData}
          className="mt-4 bg-[#22C55E] hover:bg-[#16a34a] py-2 px-6"
        >
          <Text className="text-white">Retry</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Top Section */}
      <ScrollView className="flex-1 p-6">
        <View className="flex-row justify-between items-center mb-6">
          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar alt={`${userData.username}'s Avatar`} className="w-10 h-10">
                <AvatarImage source={{ uri: userData.profile_picture_url || userData.avatar }} />
                <AvatarFallback>
                  <Text>{userData.username[0]}</Text>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute w-48 z-50 shadow-md" style={{ top: 50 }}>
              <DropdownMenuLabel>
                <Text className="font-bold">Account</Text>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onPress={() => router.push('/edit-profile')}>
                <Text>Edit Profile</Text>
              </DropdownMenuItem>
              <DropdownMenuItem onPress={handleSignOut}>
                <Text>Sign Out</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Standalone Logout Button */}
          <Button
            onPress={handleSignOut}
            className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg"
          >
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="white" />
              <Text className="text-white ml-2">Logout</Text>
            </View>
          </Button>
        </View>

        {/* User Information Card */}
        <Card className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
          <CardHeader className="items-center">
            <Avatar alt={`${userData.username}'s Avatar`} className="w-24 h-24">
              <AvatarImage source={{ uri: userData.profile_picture_url || userData.avatar }} />
              <AvatarFallback>
                <Text>{userData.username[0]}</Text>
              </AvatarFallback>
            </Avatar>
            <View className="p-3" />
            <CardTitle className="text-center text-black">{userData.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-center text-gray-500">{userData.email}</Text>
            <Text className="text-center text-gray-500">
              Skill Level: {userData.skill_level || 'Not set'}
            </Text>
          </CardContent>
          <CardFooter>
            <Button
              onPress={() => router.push('/edit-profile')}
              className="w-full bg-[#22C55E] hover:bg-[#16a34a] py-2"
            >
              <Text className="text-white">Edit Profile</Text>
            </Button>
          </CardFooter>
        </Card>
      </ScrollView>
    </View>
  );
}
