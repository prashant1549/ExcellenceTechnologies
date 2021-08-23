import React, {useEffect} from 'react';
// import MaterialIcon from 'material-icons-react';

import {Image, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {loginRequest} from '../redux/Action/Action';
export default function Login({navigation}) {
  // const toast = useToast();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1099311539417-78vkcbg64kssqhfr0iv9vtfd23magbi8.apps.googleusercontent.com',
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await AsyncStorage.setItem('AceessToken', userInfo.idToken);
      await dispatch(loginRequest(userInfo.idToken));
      // toast.show({
      //   title: 'Account verified',
      //   status: 'success',
      //   description: 'Thanks for sign in with us.',
      // });
      const user = auth().currentUser;
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          padding: 2,
          width: '90%',
          margin: 'auto',
          justifyContent: 'center',
        }}>
        <View>
          <Image
            style={{width: 300, height: 53}}
            source={require('../assets/exlogo.png')}
          />
        </View>
        <View
          style={{alignItems: 'center', alignSelf: 'center', marginTop: 10}}>
          <GoogleSigninButton
            style={{width: 240, height: 56}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        </View>
      </View>
    </View>
  );
}
