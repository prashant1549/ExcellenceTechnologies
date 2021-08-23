import React, {useEffect} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Easing,
} from 'react-native';

const EasingAnimation = ({navigation}) => {
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    animate();
  }, []);
  function animate() {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => animate());
  }
  const marginLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });
  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });
  const movingMargin = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0],
  });
  const textSize = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [18, 50, 18],
  });
  const rotateX = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          marginLeft: marginLeft,
          height: 30,
          width: 40,
          backgroundColor: 'red',
        }}
      />
      <Animated.View
        style={{
          opacity: opacity,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'blue',
        }}
      />
      <Animated.View
        style={{
          marginLeft: movingMargin,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'orange',
        }}
      />
      <Animated.Text
        style={{
          fontSize: textSize,
          marginTop: 10,
          color: 'green',
        }}>
        Animated Text!
      </Animated.Text>
      <Animated.View
        style={{
          transform: [{rotateX}],
          marginTop: 50,
          height: 30,
          width: 40,
          backgroundColor: 'black',
        }}>
        <Text style={{color: 'white'}}>Hello from TransformX</Text>
      </Animated.View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Spring')}
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
    paddingTop: 150,
  },
});
export default EasingAnimation;
