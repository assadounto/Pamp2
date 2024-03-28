// InternetContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const InternetContext = createContext();

export const InternetProvider = ({ children }) => {
  const [isInternetConnected, setIsInternetConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <InternetContext.Provider value={isInternetConnected}>
      {children}
    </InternetContext.Provider>
  );
};

export const useInternet = () => {
  return useContext(InternetContext);
};
