import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://yt3.googleusercontent.com/ytc/AIdro_nWVNW9wxOS0emRfzY_ChxZGpf1A9k6XA6DAjHZRnVW9g=s900-c-k-c0x00ffffff-no-rj" }}
          style={styles.logo}
        />
        <Text style={styles.title}>About SportsBuddy</Text>
        <Text style={styles.subtitle}>
          Connecting sports enthusiasts everywhere
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.paragraph}>
          SportsBuddy is your ultimate companion for connecting with sports
          enthusiasts, finding local games, and organizing events. Whether
          you're just starting out or you're a seasoned athlete, SportsBuddy is
          here to help you stay active and connected.
        </Text>
        <Text style={styles.paragraph}>
          Our mission is to foster community and make sports accessible for
          everyone. From tracking your progress to meeting new teammates, we’re
          building a vibrant network for sports lovers like you.
        </Text>
        <View style={styles.highlightBox}>
          <Text style={styles.highlightText}>
            Join our growing community of players and take your game to the next
            level!
          </Text>
        </View>
        <Text style={styles.paragraph}>
          Thank you for being part of the SportsBuddy journey. Together, let’s
          make sports more fun, inclusive, and accessible for everyone.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/create-group")}
      >
        <Text style={styles.createButtonText}>Create a Group</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#32CD32", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", 
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc", 
    textAlign: "center",
    marginTop: 5,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#dddddd", 
    marginBottom: 15,
    textAlign: "justify",
  },
  highlightBox: {
    backgroundColor: "#1e1e1e", 
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#32CD32", 
  },
  highlightText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#32CD32", 
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212", 
    letterSpacing: 0.5,
  },
});
