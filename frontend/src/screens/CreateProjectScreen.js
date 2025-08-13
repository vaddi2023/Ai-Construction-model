import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateProjectScreen = () => {
  const navigation = useNavigation();
  const contractorId = global.contractorId; // ✅ Auto-fetched from login

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateProject = async () => {
    if (!contractorId || !name) {
      Alert.alert("Missing Info", "Contractor ID and Project Name are required.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.4:8000/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractor_id: contractorId,
          name,
          location,
          start_date: startDate || null,
          end_date: endDate || null,
        }),
      });

      const data = await response.json();
      console.log("✅ Project created:", data);

      if (response.ok) {
        Alert.alert("Success", "Project created successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Failed", data.detail || "Something went wrong");
      }
    } catch (error) {
      console.error("❌ Error creating project:", error);
      Alert.alert("Error", "Could not connect to server.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Project</Text>

      <TextInput
        style={styles.input}
        placeholder="Project Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Button title="Create Project" onPress={handleCreateProject} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
});

export default CreateProjectScreen;
