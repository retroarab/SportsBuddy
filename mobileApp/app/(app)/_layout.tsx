import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from '~/components/api/ctx';

export default function AppLayout() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: '#1F2937' },
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#D1D5DB',
        headerStyle: { backgroundColor: '#1F2937' },
        headerTitleStyle: { color: '#FFFFFF' },
      }}
    >
      {/* Dashboard Tab */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      {/* Edit Profile Tab */}
      <Tabs.Screen
        name="edit-profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      {/* Venues Tab */}
      <Tabs.Screen
        name="venues"
        options={{
          title: 'Venues',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
        }}
      />
      {/* Venue Details Tab (Hidden from bottom navigation but accessible via routing) */}
      <Tabs.Screen
        name="venue-details"
        options={{
          title: 'Venue Details',
          tabBarButton: () => null, // Hide from bottom navigation
        }}
      />
      <Tabs.Screen
      name="connections"
      options={{
        title: 'Connections',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people" color={color} size={size} />
        ),
      }}
    />

    </Tabs>
    
  );
}
