import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function GetStarted() {
    const routerr = useRouter();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const sports = ["Football", "Squash", "Tennis", "Basketball"];
  return (
    <View style={styles.container}>
      {}
      <ImageBackground
        source={{ uri: "https://alsenoos.ro/wp-content/uploads/2023/11/O-viata-fara-durere-alsenoos.jpg" }} 
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {}
        <View style={styles.overlay}></View>
      </ImageBackground>

      {/* Content */}
      <View style={styles.content}>
        {}
        <Text style={styles.question}>Ce sport doresti sa practici?</Text>

        {/* Options */}
        {sports.map((sport) => (
          <TouchableOpacity
            key={sport}
            style={[
              styles.option,
              selectedSport === sport && styles.optionSelected,
            ]}
            onPress={() => setSelectedSport(sport)}
          >
            <Text
              style={[
                styles.optionText,
                selectedSport === sport && styles.optionTextSelected,
              ]}
            >
              {sport}
            </Text>
            {selectedSport === sport && <View style={styles.radio}></View>}
          </TouchableOpacity>
        ))}

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageBackground: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  content: {
    flex: 3,
    padding: 20,
    backgroundColor: "#121212", 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  optionSelected: {
    borderColor: "#32CD32", 
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: "#ccc",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#32CD32",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 15,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#333",
    alignItems: "center",
  },
  skipButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  continueButton: {
    flex: 1,
    paddingVertical: 15,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: "#32CD32", 
    alignItems: "center",
  },
  continueButtonText: {
    color: "#000", 
    fontWeight: "bold",
  },
});
