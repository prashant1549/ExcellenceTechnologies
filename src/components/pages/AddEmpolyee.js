import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {createEmployee} from '../../redux/Action/Action';

const AddEmployee = ({navigation}) => {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({
    email: '',
    name: '',
  });

  const handleSubmit = async () => {
    console.log(employee.email);
    if (employee.email == '' || employee.name == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please fill all given field',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      auth()
        .createUserWithEmailAndPassword(employee.email, employee.name)
        .then(res => {
          console.log(res);
          const unseData = {
            name: employee.name,
            email: res.user._user.email,
            role: 'empolyee',
            projects: [],
            isActive: true,
            photo: '',
          };
          dispatch(createEmployee(unseData));
          const usersCollection = firestore()
            .collection('Empolyee')
            .doc(res.user._user.uid)
            .set(unseData);
          ToastAndroid.showWithGravityAndOffset(
            'Successfully created',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });

      const data = {
        email: '',
        name: '',
      };
      setEmployee(data);
      navigation.navigate('Dashboard');
    }
  };
  const handleChange = (text, value) => {
    const data = {...employee};
    data[value] = text;
    setEmployee(data);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
          Create Employee
        </Text>
      </View>
      <View>
        <TextInput
          placeholder="Enter employee email"
          placeholderTextColor="gray"
          value={employee.email}
          onChangeText={text => handleChange(text, 'email')}
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />
        <TextInput
          placeholder="Enter Employee name"
          placeholderTextColor="gray"
          value={employee.name}
          onChangeText={text => handleChange(text, 'name')}
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />
        <View style={{flex: 2, alignItems: 'center', marginVertical: 60}}>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              width: 200,
              height: 50,
              borderRadius: 15,
              backgroundColor: '#50C900',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default AddEmployee;
