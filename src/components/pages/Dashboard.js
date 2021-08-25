import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {allProjects} from '../../redux/Action/Action';
import firestore from '@react-native-firebase/firestore';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const proj = firestore().collection('projects');
    const snapshot = await proj.get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const Data = useSelector(state => state.ProjectReducer.project);
  // const projectData = Data;
  console.log(Data);
  // const Data = [];
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
                height: 100,
                flexDirection: 'row',
                margin: 10,
                alignSelf: 'center',
                backgroundColor: '#FFFFFF',
              }}>
              {console.log(item)}
              <View style={{flex: 3, justifyContent: 'center', marginLeft: 5}}>
                <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
                  {item.projectTitle}{' '}
                </Text>
                <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
                  {item.disc}{' '}
                </Text>
                <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
                  {item.projectCost}{' '}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Dashboard;
