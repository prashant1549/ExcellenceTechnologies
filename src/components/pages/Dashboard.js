import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {allProjects} from '../../redux/Action/Action';
import firestore from '@react-native-firebase/firestore';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const projects = [];
    const proj = firestore().collection('projects');
    const snapshot = await proj.get();
    snapshot.forEach(doc => {
      projects.push(doc.data());
    });
    dispatch(allProjects(projects));
    return () => subscriber();
  }, []);

  const Data = useSelector(state => state.ProjectReducer.project);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row-reverse'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Add Project')}
          style={{
            width: 150,
            height: 50,
            backgroundColor: 'lightblue',
            borderRadius: 10,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Add Project</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 5}}>
        <FlatList
          data={Data.length > 0 ? Data : ''}
          keyExtractor={item => item.id}
          renderItem={item => (
            <View
              style={{
                height: 225,
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
                  width: 300,
                  height: 1,
                  borderWidth: 1,
                  borderColor: 'gray',
                }}
              />
              <View>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>
                  About :
                </Text>
                <Text numberOfLines={1} style={{marginLeft: 25}}>
                  {item.item.disc}{' '}
                </Text>
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
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginHorizontal: 10,
                    marginVertical: 2,
                  }}>
                  Project cost : {item.item.projectCost}{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginHorizontal: 10,
                    marginVertical: 2,
                  }}>
                  Expected Time : {item.item.expectedTime}{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Project Details', {
                      projectId: item.item.projectId,
                    })
                  }>
                  <Text style={{color: 'blue', fontSize: 20}}>
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Dashboard;
