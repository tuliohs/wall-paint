import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Cubo from './src/components/Cubo';
import HorizontallScroll from './src/components/HorizontalScroll';

export default function App() {
  return (
    <View >
      <Cubo />
      {/*<HorizontallScroll />*/}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
