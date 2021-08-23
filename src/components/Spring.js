import React, {useEffect} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  Image,
  Easing,
  TouchableOpacity,
} from 'react-native';

const Spring = ({navigation}) => {
  const springValue = new Animated.Value(0.3);

  function spring() {
    springValue.setValue(0.3);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 100}} onPress={() => spring()}>
        Spring
      </Text>
      <Animated.Image
        style={{
          width: 227,
          height: 200,
          transform: [{scale: springValue}],
        }}
        source={{
          uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png',
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Parallel')}
        style={{
          width: 200,
          height: 60,
          backgroundColor: 'lightblue',
          borderRadius: 20,
          justifyContent: 'center',
          margin: 30,
        }}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          Click To More Animation
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Spring;
