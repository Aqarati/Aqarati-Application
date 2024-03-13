// Assuming AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
// Import other screens
import Tabs from './app/tabs/Tabs'; // Your Tabs component that contains bottom tabs

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Define the initial route as Tabs, or any other initial screen as per your need */}
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* Other screens */}
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Add other Stack.Screen components for the rest of your screens */}
    </Stack.Navigator>
  );
}

export default AppNavigator;
