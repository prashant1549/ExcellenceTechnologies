import React, {useEffect} from 'react';
// import MaterialIcon from 'material-icons-react';
import firestore from '@react-native-firebase/firestore';
import {Image, View, ToastAndroid} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {userProfile, accessToken} from '../redux/Action/Action';
export default function Login({navigation}) {
  // const toast = useToast();
  const dispatch = useDispatch();
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
      const user = auth().currentUser;
      const unseData = {...userInfo.user, ...{role: 'empolyee'}};
      const usersCollection = firestore()
        .collection('Empolyee')
        .doc(user.uid)
        .set(unseData);
      await AsyncStorage.setItem('AceessToken', userInfo.idToken);
      dispatch(accessToken(userInfo.idToken));
      dispatch(userProfile(userInfo.user));
      ToastAndroid.showWithGravityAndOffset(
        'Successfully login',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );

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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginVertical: 20}}>
        <Image
          style={{width: 300, height: 53}}
          source={require('../assets/exlogo.png')}
        />
      </View>
      <View style={{alignItems: 'center', alignSelf: 'center', marginTop: 10}}>
        <GoogleSigninButton
          style={{width: 240, height: 56}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </View>
    </View>
  );
}
