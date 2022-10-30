import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Animated
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import SignIn from './SignIn';
import Forgotten from './Forgotten';
import Registration from './Registration';

const Login = () => {

  const [width, setWidth] = useState(0);
  const [shift, setShift] = useState(new Animated.Value(0));
  const [active, setActive] = useState<'forgotten'|'login'|'registration'>('login');

  const shiftTo = (val) => {
    Animated.timing(shift, {
      toValue: val,
      duration: 180,
      useNativeDriver: true
    }).start();
  }

  const handleLayout = ({nativeEvent: {layout: {width}}}) => {
    setWidth(width);
  }

  const transform = [{
    translateX: shift.interpolate({
      inputRange: [-width, width],
      outputRange: [-width + StyleSheet.hairlineWidth, width - StyleSheet.hairlineWidth]
    })
  }];

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Animated.View style={[{transform, marginLeft: -width, width}]}><Forgotten active={active === 'forgotten'} signin={() => {shiftTo(0); setActive('login');}}></Forgotten></Animated.View>
      <Animated.View style={[{transform, width}]}><SignIn active={active === 'login'} forgotten={() => {shiftTo(width);setActive('forgotten')}} registration={() => {shiftTo(-width);setActive('registration');}}></SignIn></Animated.View>
      <Animated.View style={[{transform, marginRight: -width, width}]}><Registration active={active === 'registration'} signin={() => {shiftTo(0);setActive('login')}}></Registration></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default Login;