
import { Text, View, StyleSheet } from 'react-native';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';

export default function App() {
  return (

    <NavigationContainer>
      <StackNavigation />

    </NavigationContainer>
   
  );
}



