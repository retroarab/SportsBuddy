import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSession } from '~/components/api/ctx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { uploadProfilePicture, updatePassword } from '~/components/api/api';

export default function EditProfileScreen() {
  const { session } = useSession();
  const [value, setValue] = useState('account');
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(session?.user?.username || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    try {
      if (!session || !session.user?.id || !session.token) {
        console.error('Debug: Missing session data:', session);
        Alert.alert('Error', 'Session is invalid. Please log in again.');
        return;
      }

      console.log('Debug: Uploading image with userId:', session.user.id);

      await uploadProfilePicture(session.user.id, session.token, selectedImage);
      Alert.alert('Upload Successful', 'Your profile picture has been updated.');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Upload Failed', 'Could not update profile picture. Please try again.');
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Error', 'Please fill in both the current and new password fields.');
      return;
    }

    try {
      if (!session || !session.user?.id || !session.token) {
        console.error('Debug: Missing session data:', session);
        Alert.alert('Error', 'Session is invalid. Please log in again.');
        return;
      }

      console.log('Debug: Changing password for userId:', session.user.id);

      await updatePassword(session.user.id, session.token, currentPassword, newPassword);
      Alert.alert('Password Updated', 'Your password has been successfully updated.');
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Update Failed', 'Could not update password. Please try again.');
    }
  };

  return (
    <View className="flex-1 justify-center p-6">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full max-w-[400px] mx-auto flex-col gap-2"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="account" className="flex-1">
            <Text className="font-bold">Account</Text>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex-1">
            <Text className="font-bold">Password</Text>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="gap-4 items-center">
                {selectedImage ? (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: '#ccc',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text>No Image</Text>
                  </View>
                )}
                <Button onPress={handlePickImage} className="bg-[#22C55E]">
                  <Text className="text-white">Choose Image</Text>
                </Button>
                <Button onPress={handleUploadImage} className="bg-[#22C55E]">
                  <Text className="text-white">Upload Image</Text>
                </Button>
              </View>

              <View className="gap-1">
                <Label nativeID="name">Name</Label>
                <Input
                  aria-labelledby="name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View className="gap-1">
                <Label nativeID="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#22C55E] hover:bg-[#16a34a]">
                <Text className="text-white">Save changes</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll need to log in again.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="gap-1">
                <Label nativeID="current-password">Current Password</Label>
                <Input
                  placeholder="********"
                  aria-labelledby="current-password"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                />
              </View>
              <View className="gap-1">
                <Label nativeID="new-password">New Password</Label>
                <Input
                  placeholder="********"
                  aria-labelledby="new-password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button
                onPress={handlePasswordChange}
                className="bg-[#22C55E] hover:bg-[#16a34a]"
              >
                <Text className="text-white">Change Password</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
