import React, { useEffect, useContext, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator_index from './src/Navigation/index';
import messaging from '@react-native-firebase/messaging';
import { ThemeProvider as RNEUIThemeProvider, createTheme, useThemeMode } from '@rneui/themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from './src/redux/store';
import { ThemeProvider, ThemeContext } from './src/ThemeContext';


import { useColorScheme } from 'react-native';


const theme = createTheme({

  lightColors: {
    lg: '#86D694',//#BCC4CC
    dg: '#00463C',
    card: 'white',
    lgb: '#86D694',
    white: '#ffff',
    slate: '#F7F7F7',
    backgroundSec: '#F7F7F9',
    activeTabBg: '#86D694',
    tabColorActive: '#F9F9F9',
    tabColor: '#86D694',
    placeholder: '#BBB9BC',
    linkBorder: '#BBB9BC',
    caution2: '#DAECD2',
    othergreen: '#86D694',
    bottomBorder: '#EFEFEF',
    disabled: '#EFEFEF',
    disabled2: '#BBB9BC',
    disabled4: '#BBB9BC',
    btnDisabled: '#F9F9F9',
    ring: "white"
  },
  darkColors: {
    lg: '#86D694',
    dg: '#F8FAFC',
    disabled2: '#BBB9BC',
    disabled4: "#3E3E40",
    disabled: '#3E3E40',
    othergreen: 'white',
    backgroundSec: '#00000',
    card: '#1C1C1E',
    lgb: '#86D694',
    white: '#ffff',
    slate: '#1C1C1E',
    caution2: '#3E3E40',
    activeTabBg: '#1C1C1E',
    tabColorActive: '#F9F9F9',
    tabColor: '#3E3E40',
    placeholder: '#3E3E40',
    linkBorder: 'white',
    caution: '#3E3E40',
    bottomBorder: '#EFEFEF',
    btnDisabled: '#707070',
    ring: "#3E3E40"
  },
});



const MainComponent = () => {

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigator_index />
      </GestureHandlerRootView>
      </ThemeProvider>
  );
};

function App() {
  const { setMode } = useThemeMode();
  useEffect(() => {
    const init = async () => {
      await RNBootSplash.hide({ fade: true, duration: 500 });
    };

    init();
  }, [])


  return (

      <RNEUIThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainComponent />
        </PersistGate>
      </Provider>
      </RNEUIThemeProvider>

  );
}

export default App;
