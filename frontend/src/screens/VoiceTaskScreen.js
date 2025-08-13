import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";

const VoiceTaskScreen = () => {
  const [file, setFile] = useState(null);

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    });

    if (result.type === 'success') {
      setFile(result);
    }
  };

  const uploadAudio = async () => {
    if (!file) {
      Alert.alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("project_id", "your_project_id_here");
    formData.append("assigned_to", "worker_id_here");

    formData.append("audio", {
      uri: file.uri,
      name: file.name,
      type: 'audio/mpeg',
    });

    try {
      const response = await axios.post("http://<YOUR_IP>:8000/audio/upload-audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      Alert.alert("Uploaded successfully", JSON.stringify(response.data));
    } catch (error) {
      console.log("Upload Error", error);
      Alert.alert("Upload failed", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick Audio File" onPress={pickAudio} />
      <View style={{ height: 20 }} />
      <Button title="Upload to Backend" onPress={uploadAudio} />
    </View>
  );
};

export default VoiceTaskScreen;
