/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {Text, TextInput} from 'react-native';

if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}
const onMessageReceived = async message => {
    notifee
    .incrementBadgeCount()
    .then(() => notifee.getBadgeCount())
    .then(count => console.log('Badge count incremented by 1 to: ', count));
};
messaging().setBackgroundMessageHandler(onMessageReceived);
AppRegistry.registerComponent(appName, () => App);
