import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { navigate } from './src/Navigation/Application';

if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

const onMessageReceived = async message => {
    notifee.incrementBadgeCount()
        .then(() => notifee.getBadgeCount())
        .then(count => console.log('Badge count incremented by 1 to: ', count));

    const { data } = message;
 
};

messaging().setBackgroundMessageHandler(onMessageReceived);






notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
        case EventType.PRESS:
            // Navigate to the route when notification is pressed
            if (detail.notification && detail.notification.data && detail.notification.data.route) {
                const data = detail.notification.data
                const user = detail.notification.data.user  ? JSON.parse(detail.notification.data.user) : null
                const vendor = detail.notification.data.vendor? JSON.parse(detail.notification.data.vendor) : null
               
                navigate(detail.notification.data.route,
                    {
                            userId: user?.id,
                            vendorId: vendor?.id,
                            userType: 'user',
                            vendor: vendor
                        }

                );
            }
            break;
        case EventType.ACTION_PRESS:
            // Handle action press if any
            break;
    }
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
    switch (type) {
        case EventType.PRESS:
            // Navigate to the route when notification is pressed
            if (detail.notification && detail.notification.data && detail.notification.data.route) {
                const data = detail.notification.data
                const user = detail.notification.data.user ? JSON.parse(detail.notification.data.user) : null
                const vendor = detail.notification.data.vendor ? JSON.parse(detail.notification.data.vendor) : null
                navigate(detail.notification.data.route,
                    {
                        userId: user?.id,
                        vendorId: vendor?.id,
                        userType: 'user',
                        vendor: vendor
                    })
            }
            break;
        case EventType.ACTION_PRESS:
            // Handle action press if any
            break;
    }
});



AppRegistry.registerComponent(appName, () => App);
