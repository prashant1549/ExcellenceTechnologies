import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {accessToken} from '../../redux/Action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await AsyncStorage.removeItem('AceessToken');
      dispatch(accessToken(null));
      navigation.navigate('Login');
    });

    return unsubscribe;
  }, [navigation]);
  return <View></View>;
};
export default Logout;
