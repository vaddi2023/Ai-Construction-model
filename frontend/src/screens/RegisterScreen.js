import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      console.log("📡 Sending registration request...");

      const response = await fetch("http://192.168.1.4:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          phone_number: "9876543210",
          role: "contractor",
          language_pref: "en",
        }),
      });

      const data = await response.json();
      console.log("✅ Register response:", data);

      if (response.ok) {
        Alert.alert("🎉 Registered!", "Please log in now.");
        navigation.navigate("Login");
      } else {
        console.warn("⚠️ Registration failed:", data);
        Alert.alert("Registration Failed", data.detail || "Something went wrong");
      }
    } catch (e) {
      console.error("❌ Network error:", e);
      Alert.alert("Error", "Server not reachable");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default RegisterScreen;
