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

const Home = ({navigation}) => {
  const spinValue = new Animated.Value(0);
  useEffect(() => {
    spin();
  }, []);
  function spin() {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  }
  const spinImage = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: 227,
          height: 200,
          transform: [{rotate: spinImage}],
        }}
        source={{
          uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png',
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Easing')}
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
export default Home;
