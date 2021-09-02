import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {allProjects} from '../../redux/Action/Action';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import TabNavigation from '../TabBar/TabNavigation';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(async () => {
    const projects = [];
    const proj = firestore().collection('projects');
    const snapshot = await proj.get();
    snapshot.forEach(doc => {
      const data = {...doc.data(), ...{projectId: doc.id}};
      projects.push(data);
    });
    dispatch(allProjects(projects));
    return () => subscriber();
  }, []);

  const Data = useSelector(state => state.ProjectReducer.project);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 5}}>
        <FlatList
          data={Data.length > 0 ? Data : ''}
          keyExtractor={item => item.id}
          renderItem={item => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Project Details', {
                  projectId: item.item.projectId,
                  name: item.item.projectTitle,
                })
              }
              style={{
                height: 120,
                marginVertical: 10,
                alignSelf: 'center',
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                textShadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.55,
                shadowRadius: 5.5,
                elevation: 5,
              }}>
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 23, padding: 10}}>
                  {item.item.projectTitle}{' '}
                </Text>
              </View>
              <View
                style={{
                  width: 350,
                  height: 1,
                  borderWidth: 1,
                  borderColor: 'gray',
                }}
              />
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>
                    About :
                  </Text>
                  <Text numberOfLines={1} style={{margin: 5}}>
                    {item.item.disc}{' '}
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginHorizontal: 10,
                    marginVertical: 6,
                  }}>
                  Project Type : {item.item.projectType}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={{flexDirection: 'row-reverse'}}>
          <ReactNativeTooltipMenu
            buttonComponent={
              // <View style={{flexDirection: 'row-reverse', zIndex: 2, flex: 1}}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: 'red',
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon size={40} name="add" color="#fff" />
              </View>
              // </View>
            }
            items={[
              {
                label: 'Create',
                onPress: () => console.log('asknklanskl'),
              },
              {
                label: 'Add',
                onPress: () => console.log('asknklanskl'),
              },
            ]}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.6,
          backgroundColor: 'lightblue',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('Dashboard')}>
            <Icon size={30} color="#000" name="list" />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>PROJECTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('User')}>
            <Icon size={30} color="#000" name="people" />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>USER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('Report')}>
            <Icon size={30} color="#000" name="report" />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>REPORT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Dashboard;
