import { AppRegistry, Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { navigate } from './src/Navigation/Application';

// Disable font scaling globally
if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

// Increment badge count function
const incrementBadgeCount = async () => {
    try {
        // Get current badge count
        const currentCount = await notifee.getBadgeCount();
        // Increment by 1
        await notifee.setBadgeCount(currentCount + 1);
        console.log('Badge count incremented by 1 to: ', currentCount + 1);
    } catch (error) {
        console.error('Error incrementing badge count:', error);
    }
};

// Handle background messages
const onMessageReceived = async message => {
    console.log('Notification received in background:', message);
    await incrementBadgeCount();
};

messaging().setBackgroundMessageHandler(onMessageReceived);

// Handle foreground notifications
notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
        case EventType.PRESS:
            // Navigate to the route when notification is pressed
            if (detail.notification?.data?.route) {
                const data = detail.notification.data;
                const user = data.user ? JSON.parse(data.user) : null;
                const vendor = data.vendor ? JSON.parse(data.vendor) : null;

                navigate(data.route, {
                    userId: user?.id,
                    vendorId: vendor?.id,
                    userType: 'user',
                    vendor: vendor,
                });
            }
            break;
        case EventType.ACTION_PRESS:
            // Handle action press if any
            break;
        case EventType.DELIVERED:
            // Increment badge count for every delivered notification
            incrementBadgeCount();
            break;
    }
});

// Handle background notification events
notifee.onBackgroundEvent(async ({ type, detail }) => {
    switch (type) {
        case EventType.PRESS:
            // Navigate to the route when notification is pressed
            if (detail.notification?.data?.route) {
                const data = detail.notification.data;
                const user = data.user ? JSON.parse(data.user) : null;
                const vendor = data.vendor ? JSON.parse(data.vendor) : null;

                navigate(data.route, {
                    userId: user?.id,
                    vendorId: vendor?.id,
                    userType: 'user',
                    vendor: vendor,
                });
            }
            break;
        case EventType.ACTION_PRESS:
            // Handle action press if any
            break;
    }
});

AppRegistry.registerComponent(appName, () => App);



// import { AppRegistry, Text, TextInput } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import notifee, { EventType } from '@notifee/react-native';
// import { navigate } from './src/Navigation/Application';

// if (Text.defaultProps == null) {
//     Text.defaultProps = {};
//     Text.defaultProps.allowFontScaling = false;
// }

// const onMessageReceived = async message => {
//     notifee.incrementBadgeCount()
//         .then(() => notifee.getBadgeCount())
//         .then(count => console.log('Badge count incremented by 1 to: ', count));

//     const { data } = message;
 
// };






// messaging().setBackgroundMessageHandler(onMessageReceived);






// notifee.onForegroundEvent(({ type, detail }) => {
//     switch (type) {
//         case EventType.PRESS:
//             // Navigate to the route when notification is pressed
//             if (detail.notification && detail.notification.data && detail.notification.data.route) {
//                 const data = detail.notification.data
//                 const user = detail.notification.data.user  ? JSON.parse(detail.notification.data.user) : null
//                 const vendor = detail.notification.data.vendor? JSON.parse(detail.notification.data.vendor) : null
               
//                 navigate(detail.notification.data.route,
//                     {
//                             userId: user?.id,
//                             vendorId: vendor?.id,
//                             userType: 'user',
//                             vendor: vendor
//                         }

//                 );
//             }
//             break;
//         case EventType.ACTION_PRESS:
//             // Handle action press if any
//             break;
//     }
// });

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//     switch (type) {
//         case EventType.PRESS:
//             // Navigate to the route when notification is pressed
//             if (detail.notification && detail.notification.data && detail.notification.data.route) {
//                 const data = detail.notification.data
//                 const user = detail.notification.data.user ? JSON.parse(detail.notification.data.user) : null
//                 const vendor = detail.notification.data.vendor ? JSON.parse(detail.notification.data.vendor) : null
//                 navigate(detail.notification.data.route,
//                     {
//                         userId: user?.id,
//                         vendorId: vendor?.id,
//                         userType: 'user',
//                         vendor: vendor
//                     })
//             }
//             break;
//         case EventType.ACTION_PRESS:
//             // Handle action press if any
//             break;
//     }
// });



// AppRegistry.registerComponent(appName, () => App);
