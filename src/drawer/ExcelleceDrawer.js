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
import {useSelector} from 'react-redux';

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
  const Data = useSelector(state => state.ProjectReducer.user);
  return (
    <DrawerContentScrollView {...props} safeArea>
      <View>
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}>
            <Image
              style={{width: 60, height: 60, borderRadius: 30}}
              source={{uri: Data.photo}}
            />
          </TouchableOpacity>

          <Text style={{fontSize: 12, color: 'gray', fontWeight: 'bold'}}>
            {Data.email}
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
  return (
    <View style={{flex: 1}}>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Create Employee" component={AddEmployee} />
        <Drawer.Screen name="logout" component={Logout} />
      </Drawer.Navigator>
    </View>
  );
}
