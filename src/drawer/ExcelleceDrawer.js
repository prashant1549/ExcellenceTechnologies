import React, {useEffect} from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import Dashboard from '../components/pages/Dashboard';
import Logout from '../components/pages/Logout';
import AddEmployee from '../components/pages/AddEmpolyee';
<<<<<<< HEAD
import {useDispatch, useSelector} from 'react-redux';
import UserList from '../components/pages/UserList';
import Report from '../components/pages/Report';
import {accessToken, userProfile} from '../redux/Action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {allEmployee} from '../redux/Action/Action';
=======
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {allEmployee} from '../redux/Action/Action';

>>>>>>> 623e39709bb3fe1a8806bcfa9d164e84329b3855
const Drawer = createDrawerNavigator();

const getIcon = screenName => {
  switch (screenName) {
    case 'Dashboard':
      return 'home';
    case 'Create Employee':
      return 'person-add';
    case 'logout':
      return 'logout';

    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
<<<<<<< HEAD
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.ProjectReducer.user);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('AceessToken');
      await AsyncStorage.removeItem('UserProfile');
      dispatch(accessToken(null));
      dispatch(userProfile({}));
      await GoogleSignin.signOut();
      // auth().signOut();
      ToastAndroid.showWithGravityAndOffset(
        'Successfully logout',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      ); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
    props.navigation.navigate('Login');
  };
  const callBack = () => {
    setModalVisible(false);
  };
=======
  const Data = auth().currentUser;
>>>>>>> 623e39709bb3fe1a8806bcfa9d164e84329b3855
  return (
    <DrawerContentScrollView {...props} safeArea>
      <View>
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}>
            <Image
              style={{width: 60, height: 60, borderRadius: 30}}
              source={
                currentUser?.photo == ''
                  ? require('../assets/avtar.png')
                  : {uri: currentUser?.photo}
              }
            />
          </TouchableOpacity>

          <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>
            {currentUser?.email}
          </Text>
        </View>
        <View
          style={{width: 350, height: 1, borderWidth: 1, borderColor: 'gray'}}
        />
        <View>
          {props.state.routeNames.map((name, index) => (
            <Pressable
              style={{
                backgroundColor:
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent',
              }}
              key={index}
              onPress={event => {
                props.navigation.navigate(name);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Icon size={30} color="gray" name={getIcon(name)} />
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    color: index == props.state.index ? 'lightblue' : 'gray',
                  }}>
                  {name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
export default function ExcelleceDrawer({navigation}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.ProjectReducer.user);
  useEffect(async () => {
    const employees = [];
    const proj = firestore().collection('Empolyee');
    const snapshot = await proj.get();
    snapshot.forEach(doc => {
      employees.push(doc.data());
    });
    dispatch(allEmployee(employees));
    return () => subscriber();
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
<<<<<<< HEAD
      <React.Fragment>
        {currentUser?.role === 'admin' ? (
          <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Create Employee" component={AddEmployee} />
            <Drawer.Screen name="User" component={UserList} />
            <Drawer.Screen name="Report" component={Report} />
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
          </Drawer.Navigator>
        )}
      </React.Fragment>
=======
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Create Employee" component={AddEmployee} />
        <Drawer.Screen name="logout" component={Logout} />
      </Drawer.Navigator>
>>>>>>> 623e39709bb3fe1a8806bcfa9d164e84329b3855
    </View>
  );
}
