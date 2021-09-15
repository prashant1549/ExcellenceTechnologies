import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
const Report = ({navigation}) => {
  const Data = useSelector(state => state.ProjectReducer.project);
  const [totleprice, setPrice] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      var totale = 0;
      for (let i = 0; i < Data.length; i++) {
        totale =
          totale +
          Data[i].projectCost *
            (Data[i].work.length > 0
              ? Data[i].work.reduce((n1, n2) => n1 + parseInt(n2.time), 0)
              : 0);
      }
      setPrice(totale);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <Text style={{flex: 0.3, fontWeight: 'bold'}}>PROJECT</Text>
        <Text style={{flex: 0.2, fontWeight: 'bold'}}>PRICE</Text>
        <Text style={{flex: 0.2, fontWeight: 'bold'}}>TOTALE HOUR</Text>
        <Text style={{flex: 0.2, fontWeight: 'bold'}}>TOTLE PRICE</Text>
      </View>
      <FlatList
        style={{flex: 5}}
        data={Data ? Data : ''}
        style={{marginVertical: 10}}
        keyExtractor={(item, index) => index}
        renderItem={item => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              flex: 1,
            }}>
            <Text style={{flex: 0.3}}>{item.item.projectTitle}</Text>
            <Text style={{flex: 0.2}}>{item.item.projectCost}$</Text>
            <Text style={{flex: 0.2}}>
              {item.item.work.length > 0
                ? item.item.work.reduce((n1, n2) => n1 + parseInt(n2.time), 0)
                : 0}
            </Text>

            <Text style={{flex: 0.2}}>
              {item.item.projectCost *
                (item.item.work.length > 0
                  ? item.item.work.reduce((n1, n2) => n1 + parseInt(n2.time), 0)
                  : 0)}
              $
            </Text>
          </View>
        )}
      />
      <View
        style={{width: 360, height: 1, borderWidth: 1, borderColor: 'gray'}}
      />
      <View style={{flexDirection: 'row-reverse'}}>
        <View style={{flexDirection: 'row', marginRight: 50}}>
          <Text style={{fontWeight: 'bold', marginHorizontal: 20}}>
            TOTALE PRICE =
          </Text>
          <Text>{totleprice}$</Text>
        </View>
      </View>
    </View>
  );
};
export default Report;
