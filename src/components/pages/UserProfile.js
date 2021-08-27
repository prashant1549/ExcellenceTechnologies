import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

const UserProfile = ({navigation}) => {
  const Data = auth().currentUser;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Image
          style={{width: 150, height: 150}}
          source={{uri: Data.photoURL}}
        />
        <Text style={{fontSize: 20, marginVertical: 10, fontWeight: 'bold'}}>
          {Data.displayName.toUpperCase()}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Email : {Data.email}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Designation : React Native Developer
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Role : Empolyee
        </Text>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={{
            width: 150,
            height: 50,
            backgroundColor: 'lightblue',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Back To Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UserProfile;
