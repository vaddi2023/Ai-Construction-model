import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProjectsScreen = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const contractorId = global.contractorId;
  console.log("📡 Fetching projects for:", contractorId);

  useEffect(() => {
    if (!contractorId) {
      console.warn("❌ No contractor ID available!");
      return;
    }

    fetch(`http://192.168.1.4:8000/projects/?contractor_id=${contractorId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch projects", err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.location}>📍 {item.location}</Text>

      <View style={styles.row}>
        <Button
          title="View Tasks"
          onPress={() => navigation.navigate("Tasks", { projectId: item.project_id })}
        />
        <Button
          title="Materials"
          onPress={() => navigation.navigate("Materials", { projectId: item.project_id })}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="+ Create New Project"
        onPress={() => navigation.navigate("CreateProject")}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : projects.length > 0 ? (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.project_id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={{ marginTop: 20 }}>No projects found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ProjectsScreen;
