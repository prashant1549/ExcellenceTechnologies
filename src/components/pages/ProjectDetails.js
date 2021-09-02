import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MultiSelect from 'react-native-multiple-select';
import firestore from '@react-native-firebase/firestore';
import {allProjects} from '../../redux/Action/Action';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const ProjectDetails = props => {
  const dispatch = useDispatch();
  const [emp, setEmp] = useState([]);
  const [dateVisible, setDateVisible] = useState(false);
  const [addWorkVisible, setAddWorkVisible] = useState(false);
  const [emparray, setEmpArray] = useState([]);
  const [addTime, setAddtime] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const Data = useSelector(state => state.ProjectReducer.project);
  const filterProject = Data.filter(
    item => item.projectId === props.route.params.projectId,
  );
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      const employees = [];
      const data1 = [];
      const proj = firestore().collection('Empolyee');
      const snapshot = await proj.get();
      snapshot.forEach(doc => {
        const data = {id: doc.id, name: doc.data().name};
        const emp1 = {id: doc.id, user: doc.data()};
        data1.push(emp1);
        employees.push(data);
        setEmpArray(data1);
      });
      setEmp(employees);
    });
    return unsubscribe;
  }, [props.navigation]);

  const onSelectedItemsChange = async selectedItems => {
    // Set Selected Items
    const filnedata = Data.findIndex(
      n1 => n1.projectId === props.route.params.projectId,
    );
    try {
      Data[filnedata].assignTo = selectedItems;
      await firestore()
        .collection('projects')
        .doc(props.route.params.projectId)
        .update({
          assignTo: selectedItems,
        });
      if (selectedItems.length > 0) {
        for (let i = 0; i < selectedItems.length; i++) {
          const userOne = await firestore()
            .collection('Empolyee')
            .doc(selectedItems[i])
            .get();
          const value = userOne?._data?.projects?.includes(
            props.route.params.projectId,
          );
          if (value === false) {
            await firestore()
              .collection('Empolyee')
              .doc(selectedItems[i])
              .update({
                projects: userOne._data.projects.push(
                  props.route.params.projectId,
                ),
              });
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Project allready assign',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        }
      }
      dispatch(allProjects(Data));
      setSelectedItems(selectedItems);
    } catch (err) {
      console.log(err.message, 'XXXXXXXXXXXXXXXXXXxxxx');
    }
  };
  const handleSubmit = async () => {
    const user = auth().currentUser;
    const data = {name: user.displayName, date: new Date(), time: addTime};
    const filnedata = Data.findIndex(
      n1 => n1.projectId === props.route.params.projectId,
    );
    Data[filnedata].work.push(data);

    await firestore()
      .collection('projects')
      .doc(props.route.params.projectId)
      .update({
        work: Data[filnedata].work,
      });
    ToastAndroid.showWithGravityAndOffset(
      'Successfully Add',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    setAddtime('');
    dispatch(allProjects(Data));
    setAddWorkVisible(false);
  };
  const callBack = () => {
    setAddWorkVisible(false);
    setDateVisible(false);
  };
  console.log(Data);
  return (
    <View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column'}}>
      <View style={{left: 10, flex: 0.7}}>
        <Text style={{fontWeight: 'bold', color: 'gray'}}>ASSIGNED TO</Text>
        <FlatList
          data={
            emparray.length > 0
              ? filterProject[0].assignTo.length > 0
                ? filterProject[0].assignTo
                : ''
              : ''
          }
          style={{marginVertical: 10}}
          horizontal={true}
          keyExtractor={(item, index) => index}
          renderItem={item => (
            <View style={{marginHorizontal: 5}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={{
                  uri:
                    emparray.length > 0
                      ? emparray.find(n1 => n1.id == item.item)?.user.photo
                      : 'asda',
                }}
              />
            </View>
          )}
        />

        <View style={{flexDirection: 'row', top: -20}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              width: 130,
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setDateVisible(true)}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>ASSIGNED TO</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 350,
            height: 1,
            borderColor: 'lightgray',
            borderWidth: 1,
            marginVertical: 20,
          }}
        />
        <View>
          <Text style={{fontWeight: 'bold', color: 'gray'}}>DISCRIPTION</Text>
          <Text style={{fontWeight: 'bold', color: 'gray', marginVertical: 20}}>
            {filterProject[0].disc}
          </Text>
        </View>
        <View
          style={{
            width: 350,
            height: 1,
            borderColor: 'lightgray',
            borderWidth: 1,
            marginVertical: 20,
          }}
        />
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <View style={{flex: 0.4}}>
            <Text style={{fontWeight: 'bold', color: 'gray'}}>TYPE</Text>
          </View>
          <View style={{flex: 0.3, alignItems: 'flex-end'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'blue',
              }}>
              {filterProject[0].projectType}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <View style={{flex: 0.4}}>
            <Text style={{fontWeight: 'bold', color: 'gray'}}>TYPE</Text>
          </View>
          <View style={{flex: 0.3, alignItems: 'flex-end'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'blue',
              }}>
              {filterProject[0].projectType}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.3,
          backgroundColor: 'blue',
          borderTopStartRadius: 50,
          borderTopEndRadius: 50,
          marginTop: 40,
          justifyContent: 'center',
        }}>
        <View
          style={{
            margin: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Work Status', {
                projectId: props.route.params.projectId,
              })
            }>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              PROJECT STATUS{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAddWorkVisible(true)}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>ADD LOG</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          callBack();
        }}>
        <View
          style={
            (styles.container,
            {
              height: 300,
              backgroundColor: 'lightblue',
              width: 300,
              marginTop: 200,
              marginLeft: 30,
              borderRadius: 10,
            })
          }>
          <Text style={styles.titleText}>
            Select employee for assign project
          </Text>
          <MultiSelect
            items={emp}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={filterProject[0].assignTo}
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#48d22b"
            submitButtonText="Submit"
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                width: 100,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setDateVisible(false)}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        onTouchCancel={() => setDateVisible(false)}
        visible={addWorkVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          callBack();
        }}>
        <View
          style={
            (styles.container,
            {
              height: 300,
              backgroundColor: 'lightblue',
              width: 300,
              marginTop: 200,
              marginLeft: 30,
              borderRadius: 10,
            })
          }>
          <Text style={styles.titleText}>ADD DAILY WORK HOUR</Text>
          <TextInput
            placeholder="Enter in work hour"
            placeholderTextColor="gray"
            value={addTime}
            onChangeText={text => setAddtime(text)}
            keyboardType="number-pad"
            keyExtractor
            style={{
              borderBottomWidth: 1,
              width: 300,
              marginHorizontal: 10,
              marginVertical: 10,
              color: '#000',
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                width: 100,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleSubmit()}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});
export default ProjectDetails;
