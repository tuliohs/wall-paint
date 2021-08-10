import { NavigationContainer, DefaultTheme, DarkTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { colors } from '../constants/theme'

import AppStack from './stacks/AppStack';

export default function Navigation({ colorScheme }) {
  const themeCustom = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      //background: '#1c2025',//EA1D2C,
      card: colors.background,
    }
  }
  return (

    <NavigationContainer
      //theme={DefaultTheme}
      theme={themeCustom}
    >
      <AppStack />
    </NavigationContainer>
  );
}