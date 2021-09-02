import React, {useEffect} from 'react';
import {View, ToastAndroid} from 'react-native';
import {useDispatch} from 'react-redux';
import {accessToken} from '../../redux/Action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Logout = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await AsyncStorage.removeItem('AceessToken');
      dispatch(accessToken(null));
      try {
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
      // auth()
      //   .signOut()
      //   .then(() => {
      //     console.log('jasjan');
      //     ToastAndroid.showWithGravityAndOffset(
      //       'Successfully logout',
      //       ToastAndroid.LONG,
      //       ToastAndroid.BOTTOM,
      //       25,
      //       50,
      //     );
      //   })
      //   .catch(error => {
      //     // An error happened.
      //     console.log('logout catch');
      //   });
      navigation.navigate('Login');
    });

    return unsubscribe;
  }, [navigation]);
  return <View></View>;
};
export default Logout;
