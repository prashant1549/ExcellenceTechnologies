import React, {useEffect} from 'react';
// import MaterialIcon from 'material-icons-react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {Image, View, ToastAndroid} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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
    var unseData = {};
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = await auth().currentUser;
      const proj = firestore().collection('Empolyee');
      const snapshot = await proj.get();
      snapshot.forEach(async doc => {
        if (userInfo.user.email === doc.data().email) {
          if (doc.data().isActive === true) {
            const data = {...doc.data(), ...{empid: doc.id}};
            await AsyncStorage.setItem('AceessToken', userInfo.idToken);
            await AsyncStorage.setItem('UserProfile', JSON.stringify(data));
            dispatch(accessToken(userInfo.idToken));
            dispatch(userProfile(data));
            ToastAndroid.showWithGravityAndOffset(
              'successfully login',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Sorry !! You are not eligible ',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Sorry !! You are not eligible ',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      });

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('jnkjnjn', error);
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
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          // disabled={this.state.isSigninInProgress}
        />
      </View>
    </View>
  );
}
