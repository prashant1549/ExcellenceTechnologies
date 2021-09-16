import React from 'react';
import Dashboard from './Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserList from './UserList';
import Report from './Report';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Project"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                size={30}
                color={focused ? '#e32f45' : '#748c94'}
                name="list"
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Project
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserList}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                size={30}
                color={focused ? '#e32f45' : '#748c94'}
                name="people"
              />

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
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                size={30}
                color={focused ? '#e32f45' : '#748c94'}
                name="report"
              />
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
    </Tab.Navigator>
  );
};
export default Home;
