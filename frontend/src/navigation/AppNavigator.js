// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // ✅ must be a default export
import RegisterScreen from '../screens/RegisterScreen'; // ✅ Make sure this path is correct
import CreateProjectScreen from "../screens/CreateProjectScreen";

import ProjectsScreen from '../screens/ProjectsScreen';
import LoginScreen from '../screens/LoginScreen'; // ✅ Correct

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
