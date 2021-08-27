import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MultiSelect from 'react-native-multiple-select';
import firestore from '@react-native-firebase/firestore';
import {allProjects} from '../../redux/Action/Action';

const ProjectDetails = props => {
  const dispatch = useDispatch();
  const [emp, setEmp] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const Data = useSelector(state => state.ProjectReducer.project);
  const filterProject = Data.filter(
    item => item.projectId === props.route.params.projectId,
  );
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      const employees = [];
      const proj = firestore().collection('Empolyee');
      const snapshot = await proj.get();
      snapshot.forEach(doc => {
        console.log('jankjan', doc.data());
        const data = {id: doc.id, name: doc.data().name};
        employees.push(data);
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
  // console.log(emp);
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
          Project Details
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Project Title :</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {filterProject[0].projectTitle}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>About Project :</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {filterProject[0].disc}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Project Type :</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {filterProject[0].projectType}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Project Cost :</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {filterProject[0].projectCost}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Project ID :</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {filterProject[0].projectId}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Expected Time for Delivered :
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {filterProject[0].expectedTime}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Project Asign to :
        </Text>
        {filterProject[0].assignTo.map((item, index) => (
          <View style={{flexDirection: 'row'}} key={index}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 5,
                marginHorizontal: 10,
              }}>
              {emp.length > 0
                ? emp[emp.findIndex(n1 => n1.id == item)].name
                : ''}
              ,
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}>Select employee for assign project</Text>
        <MultiSelect
          hideTags
          items={emp}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={filterProject[0].assignTo}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={text => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#48d22b"
          submitButtonText="Submit"
        />
      </View>
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
