import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {allProjects} from '../../redux/Action/Action';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

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
  const user = useSelector(state => state.ProjectReducer.employees);
  const currentUser = useSelector(state => state.ProjectReducer.user);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 5}}>
        <FlatList
          data={Data.length > 0 ? Data : ''}
          keyExtractor={item => item.id}
          renderItem={item => (
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={{justifyContent: 'center', marginVertical: 5}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Project Details', {
                    projectId: item.item.projectId,
                    name: item.item.projectTitle,
                  })
                }
                style={{
                  width: 350,
                  height: 60,
                  marginVertical: 10,
                  alignSelf: 'center',
                  flexDirection: 'row',
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
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 'bold',
                      fontSize: 23,
                      padding: 10,
                      color: '#fff',
                    }}>
                    {item.item.projectTitle}{' '}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                  <View style={{justifyContent: 'flex-end'}}>
                    <FlatList
                      data={item.item.assignTo ? item.item.assignTo : ''}
                      horizontal={true}
                      keyExtractor={(item, index) => index}
                      renderItem={item => (
                        <View
                          style={{
                            marginHorizontal: 5,
                          }}>
                          <Image
                            style={{width: 50, height: 50, borderRadius: 25}}
                            source={
                              user.length > 0
                                ? user.find(n1 => n1.empid == item.item)
                                    ?.photo == ''
                                  ? require('../../assets/avtar.png')
                                  : {
                                      uri: user.find(
                                        n1 => n1.empid == item.item,
                                      )?.photo,
                                    }
                                : 'ajnsjkan'
                            }
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          )}
        />
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Project')}
            style={{
              width: 70,
              height: 70,
              backgroundColor: 'red',
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon size={40} name="add" color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {currentUser?.role === 'admin' ? (
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
      ) : (
        <View />
      )}
    </View>
  );
};
export default Dashboard;
