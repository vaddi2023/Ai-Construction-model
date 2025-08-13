// src/screens/TasksScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // ✅ Only here!
import { useNavigation, useRoute } from "@react-navigation/native";

const TasksScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    setLoading(true);
    fetch(`http://192.168.1.4:8000/tasks/?project_id=${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching tasks:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchTasks);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.desc}>📝 {item.description}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Progress: {item.progress}%</Text>
      <Button
        title="Update Task"
        onPress={() =>
          navigation.navigate("TaskUpdate", {
            taskId: item.task_id,
            currentProgress: item.progress,
            currentStatus: item.status,
          })
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="+ Create Task"
        onPress={() => navigation.navigate("CreateTask", { projectId })}
      />
      <View style={{ height: 10 }} />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : tasks.length === 0 ? (
        <Text>No tasks found for this project</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.task_id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#f0f0f0",
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  desc: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
});

export default TasksScreen;
