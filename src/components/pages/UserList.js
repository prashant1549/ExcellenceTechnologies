import React, {useState} from 'react';
import {View, Text, FlatList, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {allEmployee} from '../../redux/Action/Action';
import firestore from '@react-native-firebase/firestore';

const UserList = props => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const Data = useSelector(state => state.ProjectReducer.employees);
  const handleSwitch = async id => {
    const findIndex = Data.findIndex(n1 => n1.empid === id);
    Data[findIndex].isActive = !Data[findIndex].isActive;
    await firestore().collection('Empolyee').doc(id).update({
      isActive: Data[findIndex].isActive,
    });
    dispatch(allEmployee(Data));
    setIsEnabled(isEnabled => !isEnabled);
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{flex: 0.3, fontSize: 18, fontWeight: 'bold'}}>NAME</Text>
        <Text style={{flex: 0.4, fontSize: 18, fontWeight: 'bold'}}>EMAIL</Text>
        <Text style={{flex: 0.2, fontSize: 18, fontWeight: 'bold'}}>E/D</Text>
      </View>
      <FlatList
        data={Data ? Data : ''}
        style={{marginVertical: 10}}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <Text style={{flex: 0.3}}>{item.item.name}</Text>
            <Text style={{flex: 0.4}}>{item.item.email}</Text>
            <Switch
              style={{flex: 0.2}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={item.item.isActive ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => handleSwitch(item.item.empid)}
              value={item.item.isActive}
            />
          </View>
        )}
      />
    </View>
  );
};
export default UserList;
