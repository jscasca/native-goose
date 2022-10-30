/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import React from 'react';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Root = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <App />
      </AxiosProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);

/**
Wrapp iestureHAndler
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </AuthProvider>
    </GestureHandlerRootView>
 */
