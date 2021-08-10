import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../../views/Home'

const Stack = createStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "Wall Paint", headerMode: "screen" }}
      />
    </Stack.Navigator>
  );
}