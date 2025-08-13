// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import TasksScreen from '../screens/TasksScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import TaskUpdateScreen from '../screens/TaskUpdateScreen'; // Optional if created

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      <Stack.Screen name="TaskUpdate" component={TaskUpdateScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
