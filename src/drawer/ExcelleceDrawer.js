import React, {useEffect} from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomePage from '../components/pages/HomePage';
import Logout from '../components/pages/Logout';

const Drawer = createDrawerNavigator();

const getIcon = screenName => {
  switch (screenName) {
    case 'HomePage':
      return 'home';
    case 'logout':
      return 'logout';

    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space={6} my={2} mx={1}>
        <Box px={4}>
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>
            john_doe@gmail.com
          </Text>
        </Box>
        <VStack divider={<Divider />} space={4}>
          <VStack space={3}>
            {props.state.routeNames.map((name, index) => (
              <Pressable
                key={index}
                px={5}
                py={3}
                rounded="md"
                bg={
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent'
                }
                onPress={event => {
                  props.navigation.navigate(name);
                }}>
                <HStack space={7} alignItems="center">
                  <Icon size={30} color="#900" name={getIcon(name)} />
                  <Text
                    fontWeight={500}
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.700'
                    }>
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
export default function ExcelleceDrawer() {
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1}>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="HomePage" component={HomePage} />
          <Drawer.Screen name="logout" component={Logout} />
        </Drawer.Navigator>
      </Box>
    </NativeBaseProvider>
  );
}
