import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import React from 'react';
import { useColorScheme } from '~/lib/useColorScheme'; // Use your custom hook for theme detection

export default function Index() {
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme(); // Detect if the current theme is dark

  return (
    <View
      className={`flex-1 justify-center items-center p-6 ${
        isDarkColorScheme ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* App Logo */}
      <Image
        source={{
          uri: 'https://yt3.googleusercontent.com/ytc/AIdro_nWVNW9wxOS0emRfzY_ChxZGpf1A9k6XA6DAjHZRnVW9g=s900-c-k-c0x00ffffff-no-rj',
        }}
        style={{ width: 180, height: 180, marginBottom: 30 }}
        resizeMode="contain"
      />
      {/* Welcome Text */}
      <Text
        className={`text-3xl font-extrabold mb-4 ${
          isDarkColorScheme ? 'text-[#22C55E]' : 'text-green-600'
        }`}
      >
        Welcome to Sports Buddy
      </Text>
      <Text
        className={`text-center text-lg mb-8 ${
          isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        Connect with partners, book venues, and elevate your game.
      </Text>
      <View className="w-full max-w-xs space-y-4">
        {/* Login Button */}
        <Button
          onPress={() => router.replace('/login')}
          variant="default"
          className={`w-full ${
            isDarkColorScheme ? 'bg-[#22C55E] hover:bg-[#16a34a]' : 'bg-green-500 hover:bg-green-400'
          } mb-4`}
        >
          <Text className="text-lg font-bold text-black">Login</Text>
        </Button>
        {/* Register Button */}
        <Button
          onPress={() => router.replace('/screens/PassionSelect')}
          variant="outline"
          className={`w-full ${
            isDarkColorScheme
              ? 'border-[#22C55E] hover:bg-[#22C55E] hover:border-[#22C55E]'
              : 'border-green-500 hover:bg-green-400 hover:border-green-400'
          }`}
        >
          <Text className={`text-lg font-bold ${isDarkColorScheme ? 'text-[#22C55E]' : 'text-green-600'}`}>
            Register
          </Text>
        </Button>
      </View>
    </View>
  );
}
