import React, {useEffect} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  Easing,
  TouchableOpacity,
} from 'react-native';

const Parallel = ({navigation}) => {
  const animatedValue1 = new Animated.Value(0);
  const animatedValue2 = new Animated.Value(0);
  const animatedValue3 = new Animated.Value(0);

  useEffect(() => {
    animate();
  }, []);
  function animate() {
    animatedValue1.setValue(0);
    animatedValue2.setValue(0);
    animatedValue3.setValue(0);
    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
        useNativeDriver: false,
      });
    };
    Animated.parallel(
      [
        createAnimation(animatedValue1, 2000, Easing.ease),
        createAnimation(animatedValue2, 1000, Easing.ease, 1000),
        createAnimation(animatedValue3, 1000, Easing.ease, 2000),
      ],
      {useNativeDriver: false},
    ).start();
  }
  const scaleText = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 2],
  });
  const spinText = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });
  const introButton = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 400],
  });
  return (
    <View style={[styles.container]}>
      <Animated.View style={{transform: [{scale: scaleText}]}}>
        <Text>Welcome</Text>
      </Animated.View>
      <Animated.View style={{marginTop: 20, transform: [{rotate: spinText}]}}>
        <Text style={{fontSize: 20}}>to the App!</Text>
      </Animated.View>
      <Animated.View style={{top: introButton, position: 'absolute'}}>
        <TouchableHighlight onPress={animate()} style={styles.button}>
          <Text style={{color: 'black', fontSize: 20}}>
            Click Here To Start
          </Text>
        </TouchableHighlight>
      </Animated.View>
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
export default Parallel;
