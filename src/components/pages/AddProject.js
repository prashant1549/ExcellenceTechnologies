import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Calendar} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {createProject} from '../../redux/Action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const AddProject = ({navigation}) => {
  const dispatch = useDispatch();
  const [dateVisible, setDateVisible] = useState(false);
  const [project, setProject] = useState({
    id: '',
    projectTitle: '',
    disc: '',
    projectCost: '',
    projectType: '',
    expectedTime: '',
  });
  const currentDate = moment(new Date()).format('yyyy-MM-DD');
  const data = [
    {label: 'Monthly', value: 'Monthly'},
    {label: 'Fixed Cost', value: 'Fixed Cost'},
    {label: 'Hourly', value: 'Hourly'},
  ];
  const handleDate1 = () => {
    setDateVisible(true);
  };
  const handlePickDate = day => {
    const data = {...project};
    data['expectedTime'] = day.dateString;
    setProject(data);
    setDateVisible(false);
  };
  const handleSubmit = async () => {
    if (
      project.projectTitle == '' ||
      project.projectCost == '' ||
      project.projectType == '' ||
      project.expectedTime == '' ||
      project.disc == ''
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Please fill all given field',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      project.id = Math.floor(Math.random() * 1000 + 1);
      dispatch(createProject(project));
      const usersCollection = firestore().collection('projects').add(project);

      ToastAndroid.showWithGravityAndOffset(
        'Successfully created',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      const data = {
        id: '',
        projectTitle: '',
        disc: '',
        projectCost: '',
        projectType: '',
        expectedTime: '',
      };
      setProject(data);
      navigation.navigate('Dashboard');
    }
  };
  const handleChange = (text, value) => {
    const data = {...project};
    data[value] = text;
    setProject(data);
  };
  console.log(Object.values(project).length);
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
          Project Configuration
        </Text>
      </View>
      <View>
        <TextInput
          placeholder="Enter Project Title"
          placeholderTextColor="gray"
          value={project.projectTitle}
          onChangeText={text => handleChange(text, 'projectTitle')}
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />
        <TextInput
          placeholder="Enter Discription"
          placeholderTextColor="gray"
          value={project.disc}
          onChangeText={text => handleChange(text, 'disc')}
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />
        <RadioForm
          style={{marginVertical: 10}}
          formHorizontal={true}
          animation={true}
          buttonColor={'#50C900'}>
          {/* To create radio buttons, loop through your array of options */}
          {data.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={project.projectType === obj.value}
                onPress={text => handleChange(text, 'projectType')}
                borderWidth={1}
                buttonInnerColor={'#50C900'}
                buttonOuterColor={
                  project.projectType === obj.value ? '#50C900' : '#000'
                }
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={text => handleChange(text, 'projectType')}
                labelStyle={{color: '#2ecc71'}}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>
        <TextInput
          placeholder="Enter Cost of Project"
          placeholderTextColor="gray"
          value={project.projectCost}
          onChangeText={text => handleChange(text, 'projectCost')}
          keyboardType="number-pad"
          style={{
            borderBottomWidth: 1,
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            color: '#000',
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'lightblue',
            width: 120,
            height: 35,
            borderRadius: 10,
            justifyContent: 'center',
            marginHorizontal: 20,
          }}
          onPress={handleDate1}>
          <Text style={{textAlign: 'center'}}>
            {project.expectedTime == '' ? 'Select Date' : project.expectedTime}
          </Text>
        </TouchableOpacity>

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          callBack();
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Calendar
            current={currentDate}
            minDate={currentDate}
            onDayPress={day => {
              return handlePickDate(day);
            }}
            onDayLongPress={day => {
              return handlePickDate(day);
            }}
            monthFormat={'MM yyyy'}
            disableAllTouchEventsForDisabledDays={true}
            renderHeader={date => {
              return (
                <View key={date}>
                  <Text>{date.toString('MMM yyyy')}</Text>
                </View>
              );
            }}
            enableSwipeMonths={true}
          />
        </View>
      </Modal>
    </View>
  );
};
export default AddProject;
