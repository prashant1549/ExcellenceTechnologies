import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../pages/Dashboard';
import UserList from '../pages/UserList';
import Report from '../pages/Report';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 5,
        left: 10,
        right: 10,
        elevation: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 90,
        ...styles.shadow,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserList}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                User
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Icon />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Report
              </Text>
            </View>
          ),
        }}
      />
    </View>
  );
};
export default TabNavigation;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    textShadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
