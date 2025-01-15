import React from 'react';
import { View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { registerUser } from '~/components/api/api'; // Import the registration API function

export default function Confirmation() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { passion, name, email, skillLevel, password } = params; // Include password if needed

  const handleConfirm = async () => {
    try {
      const registrationData = {
        username: name, // Assuming 'name' is used for the username
        email,
        password,
        skill_level: (typeof skillLevel === 'string' ? skillLevel : skillLevel[0]).toLowerCase(),
     };
  
      const response = await registerUser(registrationData);
      console.log('Registration successful:', response);
      alert('Registration Complete!');
      router.push('/'); // Navigate to home or dashboard
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    }
  };  

  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <Text className="text-2xl font-bold text-center mb-6 text-primary">
        Confirm Your Details
      </Text>
      <View className="space-y-2 w-full max-w-md">
        <Text className="text-lg">Passion: {passion}</Text>
        <Text className="text-lg">Name: {name}</Text>
        <Text className="text-lg">Email: {email}</Text>
        <Text className="text-lg">Skill Level: {skillLevel}</Text>
      </View>
      <Button
        onPress={handleConfirm}
        variant="default"
        className="w-full mt-4 bg-[#22C55E] text-black"
      >
        <Text>Confirm</Text>
      </Button>
      <Button
        onPress={() => router.push('/')}
        variant="outline"
        className="w-full mt-2 border-[#22C55E] hover:bg-[#22C55E] hover:text-black"
      >
        <Text>Cancel</Text>
      </Button>
    </View>
  );
}
