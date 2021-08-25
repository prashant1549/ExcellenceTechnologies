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
import {createEmployee} from '../../redux/Action/Action';

const AddEmployee = ({navigation}) => {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({
    empId: '',
    empName: '',
    contact: '',
    empEmail: '',
    projects: [],
    designation: '',
  });

  const handleSubmit = async () => {
    if (
      employee.empId == '' ||
      employee.empName == '' ||
      employee.contact == '' ||
      employee.empEmail == '' ||
      employee.designation == ''
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Please fill all given field',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      dispatch(createEmployee(employee));
      const usersCollection = firestore()
        .collection('allemployee')
        .add(employee);

      ToastAndroid.showWithGravityAndOffset(
        'Successfully created',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      const data = {
        empId: '',
        empName: '',
        contact: '',
        empEmail: '',
        projects: [],
        designation: '',
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
          placeholder="Enter Employee Name"
          placeholderTextColor="gray"
          value={employee.empName}
          onChangeText={text => handleChange(text, 'empName')}
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />
        <TextInput
          placeholder="Enter employee unique id"
          placeholderTextColor="gray"
          value={employee.empId}
          onChangeText={text => handleChange(text, 'empId')}
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />

        <TextInput
          placeholder="Enter employee email"
          placeholderTextColor="gray"
          value={employee.empEmail}
          onChangeText={text => handleChange(text, 'empEmail')}
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />

        <TextInput
          placeholder="Enter contact number"
          placeholderTextColor="gray"
          value={employee.contact}
          onChangeText={text => handleChange(text, 'contact')}
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />
        <TextInput
          placeholder="Enter employee designation"
          placeholderTextColor="gray"
          value={employee.designation}
          onChangeText={text => handleChange(text, 'designation')}
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
