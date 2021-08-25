import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {accessToken} from './src/redux/Action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/components/Login';
import ExcelleceDrawer from './src/drawer/ExcelleceDrawer';
import AddProject from './src/components/pages/AddProject';
const Stack = createNativeStackNavigator();
const App = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    // SplashScreen.hide();
    const data = await AsyncStorage.getItem('AceessToken');
    dispatch(accessToken(data));
  }, []);
  const token = useSelector(state => state.user.token);
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
