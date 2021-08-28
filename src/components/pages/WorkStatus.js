import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';

const WorkStatus = props => {
  const Data = useSelector(state => state.ProjectReducer.project);
  const filterProject = Data.find(
    item => item.projectId === props.route.params.projectId,
  );
  console.log(filterProject);
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>NAME</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>DAILY WORK</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>DATE</Text>
      </View>
      <FlatList
        data={filterProject ? filterProject.work : ''}
        style={{marginVertical: 10}}
        keyExtractor={(item, index) => index}
        renderItem={item => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Text>{item.item.name}</Text>
            <Text>{item.item.time}</Text>
            <Text>
              {moment(item?.item?.date?.toDate()).format('DD-MM-YYYY')}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
export default WorkStatus;
