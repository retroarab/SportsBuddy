import { Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        contentStyle: styles.content,
      }}
    >
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    color: '#FFFFFF',  
    fontWeight: 'bold', 
    fontSize: 20,       
  },
  content: {
    backgroundColor: '#FAFAFA', 
  },
});
