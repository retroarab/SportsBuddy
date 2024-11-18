import { router } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to SportsBuddy!</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/getStarted")}
      >
      <Text style={styles.createButtonText}> Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/about")}
      >
      <Text style={styles.createButtonText}>About us</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#000", // Black background
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text
    textAlign: "center",
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#bbb", // Light gray text
    marginBottom: 15,
  },
  highlightBox: {
    backgroundColor: "#1c1c1c", // Dark gray box
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text for the highlight
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#32CD32", // Green button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Black text for contrast
  },
});
