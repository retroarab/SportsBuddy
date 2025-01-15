import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function PassionSelection() {
  const router = useRouter();
  const [selectedPassion, setSelectedPassion] = useState<string | null>(null);

  const passions = ['Football', 'Tennis', 'Basketball', 'Swimming'];

  const handleNext = () => {
    if (!selectedPassion) {
      alert('Please select your passion to continue!');
      return;
    }
    router.push({
      pathname: './UserDetails',
      params: { passion: selectedPassion },
    });
  };

  return (
    <View className="flex-1 justify-center items-center p-6 ">
      <Text className="text-2xl font-bold text-center mb-6 text-white">
        What are you passionate about?
      </Text>
      <View className="space-y-4 w-full max-w-md">
        {passions.map((passion) => (
          <Button
            key={passion}
            variant={selectedPassion === passion ? 'default' : 'outline'}
            className={` mb-2 w-full ${
              selectedPassion === passion
                ? 'bg-[#22C55E] text-black' // Green background for selected
                : 'border-[#4B5563] text-[#9CA3AF]' // Muted gray border and text
            }`}
            onPress={() => setSelectedPassion(passion)}
          >
            <Text
              className={`text-lg ${
                selectedPassion === passion ? 'text-white' : 'text-gray-300'
              }`}
            >
              {passion}
            </Text>
          </Button>
        ))}
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
