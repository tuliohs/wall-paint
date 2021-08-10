import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaProvider } from 'react-native';
import Cubo from './src/components/Cubo';
import WallContext from './src/constants/data/WallContext';
import Navigation from './src/navigation'
import AppStack from './src/navigation/stacks/AppStack';

export default function App() {
  const [loading, setLoading] = useState(false)
  return (
    <WallContext.Provider value={{ loading, setLoading }}>
      <Navigation />
      {/*< Loader loading={loading} message={messageLoading} />*/}
    </WallContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
