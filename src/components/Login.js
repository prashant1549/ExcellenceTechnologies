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
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {userProfile, accessToken, allEmployee} from '../redux/Action/Action';
export default function Login({navigation}) {
  const dispatch = useDispatch();
  useEffect(async () => {
    GoogleSignin.configure({
      webClientId:
        '1099311539417-78vkcbg64kssqhfr0iv9vtfd23magbi8.apps.googleusercontent.com',
    });
    const employees = [];
    const proj = firestore().collection('Empolyee');
    const snapshot = await proj.get();
    snapshot.forEach(doc => {
      const data = {...doc.data(), ...{empid: doc.id}};
      employees.push(data);
    });
    dispatch(allEmployee(employees));
  }, []);
  const allEmp = useSelector(state => state.ProjectReducer.employees);
  const signIn = async () => {
    var unseData = {};
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const user = allEmp.find(el => userInfo.user.email === el.email);
      if (user) {
        if (user.isActive == true) {
          await AsyncStorage.setItem('AceessToken', userInfo.idToken);
          await AsyncStorage.setItem('UserProfile', JSON.stringify(user));
          dispatch(accessToken(userInfo.idToken));
          dispatch(userProfile(user));
          ToastAndroid.showWithGravityAndOffset(
            'successfully login',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          const googleCredential = auth.GoogleAuthProvider.credential(
            userInfo.idToken,
          );
          return auth().signInWithCredential(googleCredential);
        } else {
          await GoogleSignin.signOut();
          ToastAndroid.showWithGravityAndOffset(
            'Sorry !! You are not allowed for login ',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      } else {
        await GoogleSignin.signOut();
        ToastAndroid.showWithGravityAndOffset(
          'Your email id not exit!!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
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
