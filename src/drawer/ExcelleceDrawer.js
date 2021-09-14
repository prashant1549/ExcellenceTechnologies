import React, {useEffect, useState} from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  Pressable,
  Image,
  ToastAndroid,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Dashboard from '../components/pages/Dashboard';
import AddEmployee from '../components/pages/AddEmpolyee';
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
const Drawer = createDrawerNavigator();

const getIcon = screenName => {
  switch (screenName) {
    case 'Dashboard':
      return 'home';
    case 'Create Employee':
      return 'person-add';
    case 'User':
      return 'people';
    case 'Report':
      return 'report';

    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  const [modalVisible, setModalVisible] = useState(false);
  console.log('updatedCode');
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.ProjectReducer.user);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('AceessToken');
      dispatch(accessToken(null));
      dispatch(userProfile({}));
      await GoogleSignin.signOut();
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
                currentUser.photo == ''
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
        <View>
          <Pressable
            onPress={event => {
              setModalVisible(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Icon size={30} color="gray" name="logout" />
              <Text
                style={{
                  marginHorizontal: 20,
                  fontWeight: 'bold',
                  color: 'gray',
                }}>
                Logout
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.modalView}>
            <Text>Are you sure want to Logout?</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => callBack()}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleLogout()}>
                <Text style={styles.textStyle}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
      const data = {...doc.data(), ...{empid: doc.id}};
      employees.push(data);
    });
    dispatch(allEmployee(employees));
    return () => subscriber();
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
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
    </View>
  );
}
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    marginRight: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
