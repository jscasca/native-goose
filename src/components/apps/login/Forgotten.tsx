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
import { Theme } from '../../../assets/Styles';
import { LOGO } from '../../../assets/Index';
import { Button } from '../../ui/Button';
import { useKeyboard } from '@react-native-community/hooks';
import { AuthContext } from '../../../context/AuthContext';
import { AxiosContext } from '../../../context/AxiosContext';
import * as Keychain from 'react-native-keychain';

const Forgotten = (props) => {

  const [email, setEmail] = useState('');

  const signIn = () => {
    props.signin();
  };

  const forgot = () => {
    // call forgotten with email
  };

  return (
    <View style={styles.container}>
    <Animated.View style={[styles.form]}>
      <Animated.View style={[styles.logoV]} ><Image source={ LOGO } style={[styles.logo]} /></Animated.View>
      <TextInput 
        placeholder='Email'
        placeholderTextColor={Theme.color.text_main}
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <View style={styles.buttonContainer}>
        <Button type='primary' title='Recover' onPress={forgot} />
      </View>
      <View style={styles.links}>
        <Text style={styles.link} onPress={signIn}>Sign In</Text>
      </View>
    </Animated.View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.main_light,
    // justifyContent: 'center'
    alignItems: 'center'
  },
  logoV: {
    // backgroundColor: 'green'
  },
  form: {
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
    marginTop: 40
  },
  logo: {
    maxHeight: 180,
    maxWidth: 180,
    borderRadius: 80,
  },
  links: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center'
  },
  link: {
    margin: 20,
    fontSize: Theme.font.size.small,
    color: Theme.color.default,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'center',
    width: '40%',
  },
  input: {
    width: '70%',
    fontSize: 20,
    color: Theme.color.text_main,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: Theme.color.secondary,
    marginVertical: 10,
  },
});


export default Forgotten;