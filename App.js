import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './context/GlobalState';
import RootNavigator from './navigation/RootNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
      </NavigationContainer>
    </GlobalProvider>
  );
}