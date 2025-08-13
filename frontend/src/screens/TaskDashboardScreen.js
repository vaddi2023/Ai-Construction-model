import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";

const TaskDashboardScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params;

  useEffect(() => {
    fetch(`http://192.168.1.4:8000/tasks/?project_id=${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch tasks", err);
        setLoading(false);
      });
  }, [projectId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("TaskUpdate", {
          taskId: item.task_id,
          currentProgress: item.progress,
          currentStatus: item.status,
        })
      }
    >
      <Text style={styles.desc}>{item.description}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Progress: {item.progress}%</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button
        title="+ Add Task"
        onPress={() => navigation.navigate("CreateTask", { projectId })}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.task_id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={{ marginTop: 20 }}>No tasks found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  desc: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskDashboardScreen;
