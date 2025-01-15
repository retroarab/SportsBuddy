import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu';

export default function UserDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { passion } = params; // Access passion from Step 1

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [skillLevel, setSkillLevel] = useState<string | null>(null);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleNext = () => {
    if (!name || !email || !password || !confirmPassword || !skillLevel) {
      alert('Please fill in all fields to continue!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Navigating to confirmation with:', {
      name,
      email,
      password,
      skillLevel,
    });
    router.push({
      pathname: './Confirmation',
      params: {
        name,
        email,
        password,
        skillLevel,
      },
    });
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <Text className="text-2xl font-bold text-center mb-6 text-primary">
        Tell us about yourself
      </Text>
      <View className="space-y-4 w-full max-w-md">
        <Input
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          className="w-full mb-4"
        />
        <Input
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          className="w-full mb-4"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full mb-4"
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          className="w-full mb-4"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <Text>{skillLevel || 'Choose Skill Level'}</Text>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {skillLevels.map((level) => (
              <DropdownMenuItem
                key={level}
                onPress={() => {
                  console.log('Selected Skill Level:', level);
                  setSkillLevel(level);
                }}
              >
                <Text>{level}</Text>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onPress={handleNext}
          variant="default"
          className="w-full mb-4 mt-4 bg-[#22C55E] text-black hover:opacity-90"
        >
          <Text className="text-lg text-black">Next</Text>
        </Button>
      </View>
    </View>
  );
}
