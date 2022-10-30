import React, {createContext, SetStateAction, useState} from 'react';
import * as Keychain from 'react-native-keychain';

interface IAuthContext {
  authState: IAuth;
  getAccessToken: () => string | undefined;
  setAuthState: React.Dispatch<SetStateAction<IAuth>>;
  logout: () => void;
}

export interface ISignedUser {
  user_id: string,
  name: string,
  icon: string,
  token: string,
  refreshToken: string
}

interface IAuth {
  user: ISignedUser | null;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);
const { Provider } = AuthContext;

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState<IAuth>({
    user: null,
    authenticated: false,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      user: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.user?.token;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };