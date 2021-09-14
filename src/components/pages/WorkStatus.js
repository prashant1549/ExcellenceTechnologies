import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkStatus = props => {
  const [month, setMonth] = useState(0);
  const Data = useSelector(state => state.ProjectReducer.project);
  const filterProject = Data.find(
    item => item.projectId === props.route.params.projectId,
  );

  useEffect(() => {
    const currentDate = moment(filterProject.createdAt?.toDate()).format('M');
    setMonth(currentDate);
  }, []);
  const workData = [...filterProject.work];
  const filetdata = workData.filter(
    n1 => moment(n1.date?.toDate(), 'YYYY/MM/DD').format('M') == month,
  );

  console.log(month);
  const getMonth = month => {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'Febuary';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';

      default:
        return undefined;
    }
  };
  return (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => setMonth(month => parseInt(month) - 1)}>
          <Icon name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'green'}}>
          {getMonth(parseInt(month))}
        </Text>
        <TouchableOpacity
          onPress={() => setMonth(month => parseInt(month) + 1)}>
          <Icon name="arrow-forward" size={30} />
        </TouchableOpacity>
      </View>
      {filetdata.length > 0 ? (
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>NAME</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>DAILY WORK</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>DATE</Text>
          </View>
          <FlatList
            data={filetdata ? filetdata : ''}
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
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>sorry !! this month data not available</Text>
        </View>
      )}
    </>
  );
};
export default WorkStatus;
