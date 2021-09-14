import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {accessToken, userProfile} from './src/redux/Action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/components/Login';
import ExcelleceDrawer from './src/drawer/ExcelleceDrawer';
import AddProject from './src/components/pages/AddProject';
import UserProfile from './src/components/pages/UserProfile';
import ProjectDetails from './src/components/pages/ProjectDetails';

const Stack = createNativeStackNavigator();
const App = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    // SplashScreen.hide();
    const data = await AsyncStorage.getItem('AceessToken');
    const userProfiles = JSON.parse(await AsyncStorage.getItem('UserProfile'));
    dispatch(userProfile(userProfiles));
    dispatch(accessToken(data));
  }, []);
  const token = useSelector(state => state.ProjectReducer.token);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token === null ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={Login}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ExcelleceDrawer"
              component={ExcelleceDrawer}
            />
            <Stack.Screen name="Add Project" component={AddProject} />
            <Stack.Screen name="Profile" component={UserProfile} />
<<<<<<< HEAD
            <Stack.Screen
              name="Work Status"
              options={({route}) => ({
                title: route.params.name,
              })}
              component={WorkStatus}
            />
=======
>>>>>>> 623e39709bb3fe1a8806bcfa9d164e84329b3855
            <Stack.Screen
              options={({route}) => ({
                title: route.params.name,
                headerTintColor: 'green',
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: '#fff',
                },
              })}
              name="Project Details"
              component={ProjectDetails}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
