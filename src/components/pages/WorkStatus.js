import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';

const WorkStatus = props => {
  const [dateVisible, setDateVisible] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const Data = useSelector(state => state.ProjectReducer.project);
  const filterProject = Data.find(
    item => item.projectId === props.route.params.projectId,
  );
  const presentTime = moment(new Date(selectDate));
  console.log(moment(presentTime, 'YYYY/MM/DD').format('M'));

  const currentDate = moment(filterProject.createdAt?.toDate()).format(
    'yyyy-MM-DD',
  );
  const workData = [...filterProject.work];
  const filetdata =
    selectDate != ''
      ? workData.filter(
          n1 =>
            moment(n1.date?.toDate(), 'YYYY/MM/DD').format('M') ==
            moment(presentTime, 'YYYY/MM/DD').format('M'),
        )
      : workData;
  console.log(workData);
  const currentDate1 = moment(new Date()).format('yyyy-MM-DD');
  const handleDate1 = () => {
    setDateVisible(true);
  };
  const handlePickDate = day => {
    console.log(day);
    setSelectDate(day.dateString);
    setDateVisible(false);
  };
  // console.log(currentDate);
  return (
    <>
      <View style={{flexDirection: 'row-reverse'}}>
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
            {selectDate == '' ? 'Select Date' : selectDate}
          </Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateVisible}
        onTouchCancel={() => {
          setDateVisible(false);
        }}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setDateVisible(false);
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
    </>
  );
};
export default WorkStatus;
