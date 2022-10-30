import {
  Keyboard,
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Animated,
  KeyboardEvent
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import { Theme } from '../../../assets/Styles';
import { LOGO } from '../../../assets/Index';
import { Button } from '../../ui/Button';
import { useKeyboard } from '@react-native-community/hooks';
import { AuthContext } from '../../../context/AuthContext';
import { AxiosContext } from '../../../context/AxiosContext';
import * as Keychain from 'react-native-keychain';

const Registration = (props) => {

  const [shift, setShift] = useState(new Animated.Value(0));
  const [buttonY, setButtonY] = useState(0);
  const keyboard = useKeyboard();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passC, setPassC] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const signin = () => {
    props.signin();
  };

  const checkName = (current: string, mail: string) => {
    if (name) {
      return name;
    } else {
      return getNameFromEmail(mail);
    }
  };

  const getNameFromEmail = (mail: string) => {
    const newName = mail.substring(0, mail.indexOf("@"));
    return newName;
  }

  const register = () => {
    // validate password confirmation?link
    setError('');
    if (email === '') {
      setError('Email cannot be empty');
      return false;
    }
    if (pass === '') {
      setError('Password cannot be empty');
      return false;
    }
    if (pass !== passC) {
      setError('Password does not match');
      return false;
    }
    if (!loading) {
      setLoading(true);
      registration( name ? name : email, email, pass);
    }
  };

  const registration = (name: string, mail: string, pass: string) => {
    publicAxios.post('/auth/register', {name, mail, pass}).then((res) => {
      const user = res.data;
      Keychain.setGenericPassword('user', JSON.stringify({ user })).then( r => {
        console.log('setting keychain: ', r);
      }).catch((e) => {
        console.log('failed setting keychain: ', e);
      });
      authContext?.setAuthState({
        user: user,
        authenticated: true
      });
    }).catch((err) => {
      switch (err.status) {
        case 409: setError('An account with that email already exists'); break;
        case 404: setError('The service is offline. Please try again later'); break;
        default: setError('Failed to register. Please try again later');
      }
      setLoading(false);
    });
  }

  const handleKeyboardDidShow = (e: KeyboardEvent) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = keyboard.keyboardHeight;
    const end = e.endCoordinates.height;
    console.log('show', windowHeight, end, buttonY);
    const gap = (windowHeight - end) - buttonY;
    console.log('gap: ', gap);
    if (gap < 0) {
      Animated.timing(shift, {
        toValue: gap,
        duration: 100,
        useNativeDriver: true

      }).start();
    }
  };

  const handleKeyboardDidHide = () => {
    console.log('hide');
    Animated.timing(shift, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  const handleButtonLayout = (event) => {
    const layout = event.nativeEvent.layout;
    console.log('Registration button layout: ', layout.y + layout.height + 40)
    setButtonY(layout.y + layout.height + 80);
  };

  useEffect(() => {
    if (props.active) {
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
      return () => {
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');
      }
    }
  }, [buttonY, props]);

  const transformLogo = [{
    scaleX: shift.interpolate({
      inputRange: [0, 20],
      outputRange: [1, 0.9]
    }),
    scaleY: shift.interpolate({
      inputRange: [0, 20],
      outputRange: [1, 0.9]
    }),
    translateY: shift.interpolate({inputRange: [0,1], outputRange: [1,0]})
  }];

  const transformForm = [{
    translateY: shift
  }];

  return (
    <View style={styles.container}>
    <Animated.View style={[transformForm, styles.form]}>
      <Animated.View style={[transformLogo, styles.logoV]} ><Image source={ LOGO } style={[styles.logo]} /></Animated.View>
      <TextInput 
        placeholder='Name'
        placeholderTextColor={Theme.color.text_main}
        autoCapitalize='none'
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput 
        placeholder='Email'
        placeholderTextColor={Theme.color.text_main}
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor={Theme.color.text_main}
        secureTextEntry
        style={styles.input}
        value={pass}
        onChangeText={text => setPass(text)}
      />
      <TextInput
        placeholder='Confirm Password'
        placeholderTextColor={Theme.color.text_main}
        secureTextEntry
        style={styles.input}
        value={passC}
        onChangeText={text => setPassC(text)}
      />
      <Text style={styles.error}>{error}</Text>
      <View onLayout={handleButtonLayout} style={styles.buttonContainer}>
        <Button type='primary' title='Register' onPress={register} />
      </View>
      <View style={styles.links}>
        <Text style={styles.link} onPress={signin}>Sign In</Text>
      </View>
    </Animated.View>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.secondary,
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
    backgroundColor: Theme.color.main,
    marginVertical: 10,
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.color.text_error
  }
});

export default Registration;