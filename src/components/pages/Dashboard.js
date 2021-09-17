import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {allProjects} from '../../redux/Action/Action';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import * as Progress from 'react-native-progress';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const Data = useSelector(state => state.ProjectReducer.project);
  const user = useSelector(state => state.ProjectReducer.employees);
  const currentUser = useSelector(state => state.ProjectReducer.user);
  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const projects = [];
      const proj = firestore().collection('projects');
      const snapshot = await proj.get();
      snapshot.forEach(doc => {
        const data = {...doc.data(), ...{projectId: doc.id}};
        projects.push(data);
      });
      dispatch(allProjects(projects));
    });
    return unsubscribe;
  }, [navigation]);
  const selectedArray = Data.filter(el =>
    currentUser?.projects?.includes(el.projectId),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#F5F7FB'}}>
      <View style={{flex: 0.6}}>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            height: 60,
            marginTop: 10,
            marginHorizontal: 20,
            borderRadius: 20,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setCount(1)}
            style={
              count == 1
                ? {
                    backgroundColor: '#A88B97',
                    width: 70,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }
                : ''
            }>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: count == 1 ? 'white' : 'gray',
              }}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCount(2)}
            style={
              count == 2
                ? {
                    backgroundColor: '#A88B97',
                    width: 70,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }
                : ''
            }>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: count == 2 ? 'white' : 'gray',
              }}>
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCount(3)}
            style={
              count == 3
                ? {
                    backgroundColor: '#A88B97',
                    width: 90,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }
                : ''
            }>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: count == 3 ? 'white' : 'gray',
              }}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 5, marginTop: 20}}>
        <FlatList
          data={
            currentUser?.role == 'admin'
              ? count == 1
                ? Data
                : count == 2
                ? Data.filter(n1 => n1.status == 'Ongoing')
                : count == 3
                ? Data.filter(n1 => n1.status == 'complete')
                : ''
              : selectedArray?.length > 0
              ? count == 1
                ? selectedArray
                : count == 2
                ? selectedArray.filter(n1 => n1.status == 'Ongoing')
                : count == 3
                ? selectedArray.filter(n1 => n1.status == 'complete')
                : ''
              : ''
          }
          keyExtractor={item => item.id}
          renderItem={item => (
            <LinearGradient
              colors={['#fff', '#fff', '#fff']}
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                borderRadius: 15,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Project Details', {
                    projectId: item.item.projectId,
                    name: item.item.projectTitle,
                  })
                }
                style={{
                  width: 340,
                  height: 170,
                  marginVertical: 10,
                  shadowColor: '#000',
                  textShadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.55,
                  shadowRadius: 5.5,
                  elevation: 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.6}}>
                    <View style={{marginHorizontal: 20}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 23,
                          color: '#000',
                        }}>
                        {item.item.projectTitle}{' '}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          color: 'gray',
                        }}>
                        {item.item.disc}{' '}
                      </Text>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                      <Text
                        style={{
                          marginVertical: 10,
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        Team
                      </Text>
                      <View style={{justifyContent: 'flex-end'}}>
                        <FlatList
                          data={
                            item.item.assignTo?.length > 0
                              ? item.item.assignTo
                              : ''
                          }
                          horizontal={true}
                          keyExtractor={(item, index) => item}
                          renderItem={item => (
                            <View>
                              {console.log(item.index)}
                              {item.index >= 2 ? (
                                <View
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'gray',
                                    marginLeft: item.index == 0 ? 0 : -20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Icon name="add" size={30} color="#fff" />
                                </View>
                              ) : (
                                <Image
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    marginLeft: item.index == 0 ? 0 : -20,
                                  }}
                                  source={
                                    user?.length > 0
                                      ? user.find(n1 => n1.empid == item.item)
                                          ?.photo == ''
                                        ? require('../../assets/avtar.png')
                                        : {
                                            uri: user.find(
                                              n1 => n1.empid == item.item,
                                            )?.photo,
                                          }
                                      : require('../../assets/avtar.png')
                                  }
                                />
                              )}
                            </View>
                          )}
                        />
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: 'gray',
                        marginHorizontal: 20,
                      }}>
                      {moment(new Date()).format('MMMM DD yyyy')}
                    </Text>
                  </View>
                  <View style={{flex: 0.4}}>
                    {/* <Progress.Circle progress={0.3} width={200} /> */}
                    <Progress.Pie progress={0.4} size={120} color="#96BB7C" />
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          )}
        />
        {/* {currentUser?.role === 'admin' ? (
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
        ) : (
          <View />
        )} */}
      </View>
    </View>
  );
};
export default Dashboard;
