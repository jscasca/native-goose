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
import { Button } from './ui/Button';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';
import { LOGO } from '../assets/Index';
import { Theme } from '../assets/Styles';
import Spinner from './Spinner';

const Login = () => {

  const translation = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [state, setState] = useState<'login' | 'loading' | 'registration'>('login');
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const register = (name: string, mail: string, pass: string) => {
    setState('loading');
    publicAxios.post('/auth/register', { name, mail, pass}).then((res) => {
      const user = res.data;
      // save user -> set Auth
    }).catch((err) => {
      setState('registration');
      // display error somewhere?
    });

  };

  const login = (mail: string, pass: string) => {
    setState('loading');
    publicAxios.post('/auth/login', { mail, pass }).then((res) => {
      const user = res.data;
      console.log('req: ', res, user);
      Keychain.setGenericPassword('user', JSON.stringify({ user })).then(r => {
        console.log('setting keychain: ', r);
      }).catch((e) => {
        console.error('failed seeting keychain: ', e);
      });
      authContext?.setAuthState({
        user: user,
        authenticated: true
      });
      // save user?
    }).catch((err) => {
      setState('login');
    });
  }

  const onLogin = () => {
    console.log('log in...');
    login(email, password);
  };

  const keyboardShow = () => {};

  const keyboardHide = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image source={ LOGO } style={styles.logo} />
      {/* Login Moves right */}
      <Animated.View></Animated.View>
      {/* Registration moves left */}
      <Animated.View></Animated.View>
      { state === 'loading' && <Spinner />}
      { state === 'login' && <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fefefe"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fefefe"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Text style={styles.link} onPress={() => setState('registration')}>Sign up</Text>
        <View style={styles.buttonContainer} ><Button type='primary' title="Login" /*style={styles.button}*/ onPress={() => onLogin()} /></View>
      </View>}
      { state === 'registration' && <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#fefefe"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fefefe"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fefefe"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Text style={styles.link} onPress={() => setState('login')}>Sign in</Text>
        <View style={styles.buttonContainer}><Button type='primary' title="Sign Up" /*style={styles.button}*/ onPress={() => onLogin()} /></View>
      </View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.main,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '50%',
  },
  logo: {
    marginTop: 60,
    marginBottom: 10,
    maxHeight: 160,
    maxWidth: 160,
    borderRadius: 60
  },
  form: {
    width: '80%',
    margin: '10%',
  },
  input: {
    fontSize: 20,
    color: Theme.color.text_main,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: Theme.color.secondary,
    marginVertical: 10,
  },
  link: {
    marginVertical: 10,
    fontSize: Theme.font.size.small,
    color: Theme.color.default,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  button: {},
});

export default Login;