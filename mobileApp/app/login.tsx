import React, { useState, useEffect } from 'react';
import { View, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { loginUser } from '../components/api/api';
import { useSession } from '../components/api/ctx';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { session, signIn } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
    if (session) {
      router.replace('/dashboard');
    }
  }, [session]);

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
  
      // Debugging to ensure response has expected fields
      console.log('Debug: Response from loginUser:', response);
  
      // Save the session data
      signIn(response);
  
      Alert.alert('Login Successful', `Welcome ${response.user.username}`);
      router.replace('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      console.error('Debug: Login error:', error);
      Alert.alert('Login Failed', errorMessage);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-background">
      <View className="space-y-8 w-full max-w-md">
        {/* Logo */}
        <View className="flex items-center mb-6">
          <Image
            source={require('')} // Replace with your logo path
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </View>

        {/* Header */}
        <Text className="text-3xl mb-1 font-extrabold text-center text-[#22C55E]">
          Welcome Back
        </Text>
        <Text className="text-center text-base mb-4 text-gray-500">
          Login to Sports Buddy and start your journey!
        </Text>

        {/* Input Fields */}
        <View className="space-y-4">
          <Input
            placeholder="Username"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className="w-full mb-4 border-gray-300 text-[#22C55E] placeholder-gray-400 rounded-lg px-4 py-3"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full mb-4 border-gray-300 text-[#22C55E] placeholder-gray-400 rounded-lg px-4 py-3"
          />
        </View>

        {/* Login Button */}
        <Button
          onPress={handleLogin}
          className="w-full bg-[#22C55E] hover:bg-[#16a34a] rounded-lg py-3"
        >
          <Text className="text-lg font-bold text-black">Login</Text>
        </Button>

        {/* Footer */}
        <Text className="text-center text-sm text-gray-500 mt-4">
          Forgot your password?{' '}
          <Text
            className="text-[#22C55E] underline"
            onPress={() => router.push('/forgot-password')}
          >
            Reset it here
          </Text>
        </Text>
      </View>
    </View>
  );
}
