import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const ProjectDetails = props => {
  const Data = useSelector(state => state.ProjectReducer.project);
  const filterProject = Data.filter(
    item => item.projectId === props.route.params.projectId,
  );
  console.log(filterProject);

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
              {item},
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default ProjectDetails;
