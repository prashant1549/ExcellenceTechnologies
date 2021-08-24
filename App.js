import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Animated, StyleSheet, Text, Image, Easing} from 'react-native';
import Home from './src/components/Home';
import EasingAnimation from './src/components/Easing';
import Spring from './src/components/Spring';
import Parallel from './src/components/Parallel';
import Login from './src/components/Login';
import ExcelleceDrawer from './src/drawer/ExcelleceDrawer';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ExcelleceDrawer"
          component={ExcelleceDrawer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
