import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Picker,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";

const TaskUpdateScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { taskId, currentProgress, currentStatus } = route.params;

  const [progress, setProgress] = useState(currentProgress.toString());
  const [status, setStatus] = useState(currentStatus);

  const handleUpdate = async () => {
    if (!progress || isNaN(progress)) {
      Alert.alert("Invalid Input", "Progress must be a number.");
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.4:8000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          progress: parseInt(progress),
          status,
        }),
      });

      const data = await response.json();
      console.log("✅ Task updated:", data);

      if (response.ok) {
        Alert.alert("Success", "Task updated successfully.");
        navigation.goBack();
      } else {
        Alert.alert("Update Failed", data.detail || "Something went wrong.");
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      Alert.alert("Error", "Could not connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Progress (%)</Text>
      <TextInput
        style={styles.input}
        value={progress}
        onChangeText={setProgress}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Pending" value="pending" />
        <Picker.Item label="In Progress" value="in_progress" />
        <Picker.Item label="Done" value="done" />
      </Picker>

      <Button title="Update Task" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
  },
});

export default TaskUpdateScreen;
