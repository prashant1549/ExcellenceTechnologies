import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {allEmployee, userProfile} from '../../redux/Action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.ProjectReducer.user);
  const user = useSelector(state => state.ProjectReducer.employees);
  const handleImage = () => {
    const index = user.findIndex(n1 => n1.empid === currentUser.empid);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      await firestore().collection('Empolyee').doc(currentUser.empid).update({
        photo: image.path,
      });
      user[index].photo = image.path;
      dispatch(allEmployee(user));
      dispatch(userProfile(user[index]));
      await AsyncStorage.setItem('UserProfile', JSON.stringify(user[index]));
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity onPress={() => handleImage()}>
          <Image
            style={{width: 150, height: 150}}
            source={
              currentUser.photo == ''
                ? require('../../assets/avtar.png')
                : {uri: currentUser.photo}
            }
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginVertical: 10, fontWeight: 'bold'}}>
          {currentUser.name.toUpperCase()}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Email : {currentUser.email}
        </Text>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Role : {currentUser.role}
        </Text>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={{
            width: 150,
            height: 50,
            backgroundColor: 'lightblue',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Back To Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UserProfile;
