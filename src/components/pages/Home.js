import React from 'react';
import Dashboard from './Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserList from './UserList';
import Report from './Report';
import {View, Text, TouchableOpacity} from 'react-native';
import LandingPage from './LandingPage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddProject from './AddProject';

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
        name="Home"
        component={LandingPage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                size={30}
                color={focused ? '#e32f45' : '#748c94'}
                name="home"
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
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
        name="Add Project"
        component={AddProject}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: focused ? '#e32f45' : '#A88B97',
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon size={40} name="add" color="#fff" />
              </View>
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
