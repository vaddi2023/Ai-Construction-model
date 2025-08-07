import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ProjectListScreen from "../screens/ProjectListScreen";
import TaskDashboardScreen from "../screens/TaskDashboardScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Projects" component={ProjectListScreen} />
      <Stack.Screen name="Tasks" component={TaskDashboardScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default AppNavigator;
