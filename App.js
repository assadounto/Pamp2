import React, {useEffect} from 'react';
import {Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector,useDispatch} from 'react-redux';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator_index from './src/Navigation/index';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { backendURL } from './src/services/http';
import { useNavigation } from '@react-navigation/core';
import { Linking } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App() {



    const requestTPermission = () => {
      messaging()
        .requestPermission()
        .then(() => {
         
        })
        .catch((error) => {
          console.log('permission rejected ' + error);
        });
    };
   
  useEffect(() => {
   
    
    const init = async () => {
     
    };

    init().finally(async () => {

      await RNBootSplash.hide({fade: true, duration: 500});
     
    });
  }, []);
  const getFirebaseToken = async () => {
    // Register the device with FCM
   

    // Get the token
    const generatedToken = await messaging().getToken();

    return generatedToken;
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigator_index />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
