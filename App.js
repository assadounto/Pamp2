import React, {useEffect} from 'react';
import {Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator_index from './src/Navigation/index';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { backendURL } from './src/services/http';


function App() {
  const [token, setToken] = React.useState('');

    const requestTPermission = () => {
      messaging()
        .requestPermission()
        .then(() => {
         
          fetchData() 
        })
        .catch((error) => {
          console.log('permission rejected ' + error);
        });
    };
  
    async function fetchData() {
     const generatedToken = await getFirebaseToken();
      setToken(generatedToken);
      console.log(generatedToken)
      alert(generatedToken+'rich')
      generatedToken && axios.get(`${backendURL}/token?token=${generatedToken}`)
    }
  useEffect(() => {
   
    fetchData() 
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
        <Navigator_index />
      </PersistGate>
    </Provider>
  );
}

export default App;
