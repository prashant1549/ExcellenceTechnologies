import React from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LandingPage = () => {
  return (
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#F5F7FB'}}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: '#fff',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <View style={{marginHorizontal: 15}}>
          <Text style={{fontSize: 13, fontWeight: 'bold', color: 'gray'}}>
            {moment(new Date()).format('MMMM DD yyyy')}
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Today</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.5,
                backgroundColor: '#A88B97',
                width: 200,
                height: 100,
                marginRight: 10,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row-reverse'}}>
                <Icon name="autorenew" size={40} color="#fff" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                  marginTop: 15,
                  marginHorizontal: 20,
                }}>
                Ongoing
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                backgroundColor: '#E9AC7F',
                width: 200,
                height: 100,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row-reverse'}}>
                <Icon name="access-time" size={40} color="#fff" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                  marginTop: 15,
                  marginHorizontal: 20,
                }}>
                In Process
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <View
              style={{
                flex: 0.5,
                backgroundColor: '#96BB7C',
                width: 200,
                height: 100,
                marginRight: 10,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row-reverse'}}>
                <Icon name="fact-check" size={40} color="#fff" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                  marginTop: 15,
                  marginHorizontal: 20,
                }}>
                Complete
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                backgroundColor: '#F17473',
                width: 200,
                height: 100,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row-reverse'}}>
                <Icon name="cancel" size={40} color="#fff" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                  marginTop: 15,
                  marginHorizontal: 20,
                }}>
                Cancel
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 0.5}}>{/* <Text>sndjkasn</Text> */}</View>
    </View>
  );
};
export default LandingPage;
