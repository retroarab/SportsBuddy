import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu';

export default function SkillLevelSelection() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { passion, name, email } = params;

  const [skillLevel, setSkillLevel] = useState<string | null>(null);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleNext = () => {
    if (!skillLevel) {
      alert('Please select your skill level to continue!');
      return;
    }
    router.push({
      pathname: './Confirmation',
      params: {
        passion,
        name,
        email,
        skillLevel,
      },
    });
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <Text className="text-2xl font-bold text-center mb-6 text-primary">
        What’s your skill level?
      </Text>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Text>{skillLevel || 'Choose Skill Level'}</Text>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {skillLevels.map((level) => (
            <DropdownMenuItem key={level} onPress={() => setSkillLevel(level)}>
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
  );
}
