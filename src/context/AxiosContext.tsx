import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor, { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

interface IAxiosContext {
  authAxios: any;
  publicAxios: any;
}

const baseUrl = 'http://192.168.0.160:8099';

const AxiosContext = createContext<IAxiosContext>({authAxios: null, publicAxios: null});
const { Provider } = AxiosContext;

const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const publicAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  authAxios.interceptors.request.use(
    config => {
      // if (!config.headers?.Authorization) {
      //   (config.headers as any).Authorization = `Bearer ${authContext.getAccessToken()}`;
      // }
      // return config;
      if ((config as AxiosAuthRefreshRequestConfig).skipAuthRefresh) {
        // console.log('should already have a header: ', config.headers);
        return config;
      }
      // console.log('sending request: ', config.url, (config as any).skipAuthRefresh);
      const token = authContext?.getAccessToken();
      // console.log('interceptor token: ', token?.substring(0) + '...');
      console.log()
      if(token) {
        (config.headers as any)['x-access-token'] = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // authAxios.interceptors.response.use(
  //   response => response,
  //   async (err) => {
  //     console.log('failed interceptor');
  //     const original = err.config;
  //     if (err.response.status === 401 && !original._retry) {
  //       original._retry = true;
  //       try {
  //         const rs = await authAxios.post('/auth/refresh', {
  //           token: authContext!.authState.user?.refreshToken,
  //           user_id: authContext?.authState.user?.user_id
  //         });
  //         console.log('rs data: ', rs.data);
  //         const user = rs.data;
  //         authContext?.setAuthState({
  //           user: user,
  //           authenticated: true
  //         });
  //         return authAxios(original);
  //       } catch( _err) {
  //         console.error('Failed to get token: kicking user out');
  //         authContext?.setAuthState({
  //           user: null,
  //           authenticated: false
  //         })
  //         return Promise.reject(_err);
  //       }
  //     }
  //   }
  // );
  authAxios.interceptors.response.use(
    response => response,
    async (err) => {
      const original = err.config;
      if (original && (original as AxiosAuthRefreshRequestConfig).skipAuthRefresh) {
        return Promise.reject(err);
      }
      if (err && err.response && err.response.status === 401 && !original._retry) {
        original._retry = true;
        return authAxios(original);
      }
      return Promise.reject(err);
    }
  )

  const refreshAuthLogic = failedRequest => {
    // console.log('Failed request: ', JSON.stringify(failedRequest));
    console.log('Failed request: ', failedRequest.config.url);
    const data = {
      token: authContext!.authState.user?.refreshToken,
      user_id: authContext?.authState.user?.user_id
    };

    const options = {
      method: 'POST',
      data,
      url: baseUrl + '/auth/refresh',
    };

    return publicAxios(options)
      .then(async tokenRefreshResponse => {
        // console.log('refreshing: ', tokenRefreshResponse.data);
        // console.log('saving new token: ', tokenRefreshResponse.data.token.substring(0));
        // prep failed request
        failedRequest.response.config.headers['x-access-token'] = tokenRefreshResponse.data.token;
        
        const user = tokenRefreshResponse.data;
        
        authContext?.setAuthState({
          user: tokenRefreshResponse.data,
          authenticated: true
        });
        // console.log('Saving new token');

        await Keychain.setGenericPassword(
          'user',
          JSON.stringify({
            user,
          }),
        );

        return Promise.resolve();
      })
      .catch(e => {
        console.error('REFRESH failed: ', e);
        // TODO investigate weird 403 :/ getting some random token out of nowhere?
        authContext?.setAuthState({
          user: null,
          authenticated: false
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, { pauseInstanceWhileRefreshing: true});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};