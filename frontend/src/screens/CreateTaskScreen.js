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
import { Picker } from "@react-native-picker/picker"; // ✅ Correct import
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params;

  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("0");
  const [status, setStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState("");

  const handleCreate = async () => {
    if (!description) {
      Alert.alert("Missing", "Please enter task description.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.4:8000/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: projectId,
          description,
          progress: parseInt(progress),
          status,
          assigned_to: assignedTo || null,
        }),
      });

      const data = await response.json();
      console.log("✅ Task created:", data);

      if (response.ok) {
        Alert.alert("Success", "Task created successfully");
        navigation.goBack();
      } else {
        Alert.alert("Failed", data.detail || "Something went wrong");
      }
    } catch (error) {
      console.error("❌ Task creation error:", error);
      Alert.alert("Error", "Could not connect to server.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Progress %"
        keyboardType="numeric"
        value={progress}
        onChangeText={setProgress}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="In Progress" value="in_progress" />
          <Picker.Item label="Done" value="done" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Assigned To (User ID)"
        value={assignedTo}
        onChangeText={setAssignedTo}
      />

      <Button title="Create Task" onPress={handleCreate} />
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
  pickerWrapper: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 6,
  },
});

export default CreateTaskScreen;
