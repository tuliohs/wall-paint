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
        options={{
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#00a591',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            //fontWeight: 'bold',
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTitle: "Wall Paint", headerMode: "screen"
        }}
      />
    </Stack.Navigator>
  );
}