import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("9876543210");
  const navigation = useNavigation();

  useEffect(() => {
    const autoRegister = async () => {
      try {
        const res = await fetch("http://192.168.1.4:8000/auth/register", {
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

        const data = await res.json();
        console.log("🟢 Auto-register response:", data);
      } catch (e) {
        console.log("❌ Auto-register failed:", e.message);
      }
    };

    autoRegister();
  }, []);

  const handleLogin = async () => {
    if (!phoneNumber) {
      Alert.alert("Missing", "Enter phone number");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.4:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: phoneNumber }),

      });

      const data = await response.json();
      console.log("🔐 Login response:", data);
      console.log("📡 Status:", response.status);

      if (response.status === 200 && data.user_id) {
        global.contractorId = data.user_id; // ✅ Corrected field
        console.log("✅ Logged in as:", data.name, "Contractor ID:", global.contractorId);

        Alert.alert("Login Success", `Welcome ${data.name}`);
        navigation.reset({
          index: 0,
          routes: [{ name: "Projects" }],
        });
      } else {
        console.warn("⚠️ Login failed:", data);
        Alert.alert("Login Failed", data.detail || "Unknown error");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Server not reachable");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Login Screen</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
});

export default LoginScreen;