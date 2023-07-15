import React, {useEffect} from 'react';
import {Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator_index from './src/Navigation/index';

function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
     
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigator_index />
      </PersistGate>
    </Provider>
  );
}

export default App;
