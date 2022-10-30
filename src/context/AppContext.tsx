import React, {createContext, useContext} from 'react';

interface IAppContext {
  current: any;
  stack: any;
  push: any;
}

/**
 * App Provider: Should we use this? To keep stuff in place
 * Handle navigation
 * @param param0 
 * @returns 
 */


const AppProvider = ({ children }) => {

  const AppContext = createContext<IAppContext|null>(null);
  const { Provider } = AppContext;

  const current = () => {};
  const stack = () => {};
  const push = () => {};

  return (
    <Provider
      value={{
        current,
        stack,
        push
      }}
    >
      { children }
    </Provider>
  );
}