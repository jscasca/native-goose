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
import React, {useContext, useEffect, useRef, useState} from 'react';
import { Theme } from '../../../assets/Styles';
import { LOGO } from '../../../assets/Index';
import { Button } from '../../ui/Button';
import { useKeyboard } from '@react-native-community/hooks';
import { AuthContext } from '../../../context/AuthContext';
import { AxiosContext } from '../../../context/AxiosContext';
import * as Keychain from 'react-native-keychain';

const SignIn = (props) => {

  const [shift, setShift] = useState(new Animated.Value(0));
  const [buttonY, setButtonY] = useState(0);
  const keyboard = useKeyboard();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const forgotten = () => {
    props.forgotten();
  };

  const registration = () => {
    props.registration();
  };

  const signin = () => {
    if (!loading) {
      setLoading(true);
      setError('');
      login(email, pass);
    }
  };

  const login = (mail: string, pass: string) => {
    if (mail === '' || pass === '') {
      setError('Details cannot be empty');
      setLoading(false);
      return false;
    }
    publicAxios.post('/auth/login', {mail, pass}).then((res) => {
      const user = res.data;
      Keychain.setGenericPassword('user', JSON.stringify({ user })).then(r => {
        console.log('setting keychain: ', r);
      }).catch((e) => {
        console.error('failed seeting keychain: ', e);
      });
      authContext?.setAuthState({
        user: user,
        authenticated: true
      });
    }).catch((err) => {
      console.log(JSON.stringify(err));
      // TBD show error? shake?
      setError('Failed to log in');
      setLoading(false);
    });
  };

  const handleKeyboardDidShow = (e: KeyboardEvent) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = keyboard.keyboardHeight;
    const end = e.endCoordinates.height;
    const gap = (windowHeight - end) - buttonY;
    if (gap < 0) {
      Animated.timing(shift, {
        toValue: gap,
        duration: 100,
        useNativeDriver: true

      }).start();
    }
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  const handleButtonLayout = (event) => {
    const layout = event.nativeEvent.layout;
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
      inputRange: [0, 10],
      outputRange: [1, 0.6]
    }),
    scaleY: shift.interpolate({
      inputRange: [0, 10],
      outputRange: [1, 0.6]
    })
  }];

  const transformForm = [{
    translateY: shift
  }];

  return (
    <View style={styles.container}>
      <Animated.View style={[transformForm, styles.form]}>
        <Animated.View style={[transformLogo, styles.logoV]} ><Image source={ LOGO } style={[styles.logo]} /></Animated.View>
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
        <Text style={styles.error}>{error}</Text>
        <View onLayout={handleButtonLayout} style={styles.buttonContainer}>
          <Button type='primary' title='Sign In' onPress={signin} />
        </View>
        <View style={styles.links}>
          <Text style={styles.link} onPress={forgotten}>Forgot your password</Text>
          <Text style={styles.link} onPress={registration}>Sign up</Text>
        </View>
      </Animated.View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.main,
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
  error: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.color.text_error
  }
});

export default SignIn;