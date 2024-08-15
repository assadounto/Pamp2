import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTabBar from '../../../components/Topnav';
import ChatListScreen from './ChatList';
import { makeStyles } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { View,Text,Pressable, Platform } from 'react-native';
import Notifications from '../notifications/Notifications';
import { useTheme } from '@rneui/themed';
import { moderateScale,horizontalScale } from '../../Dimensions';
import SafeAreaTop from '../../../components/SafeAreaTop';
const Tab = createMaterialTopTabNavigator();
const NotiMessage = ({ navigation,route }) => {
    const {theme}=useTheme()
    const {new_message}= route.params?route.params:{}
    const styles=useStyles()
return (
      <>

        <View style={{marginTop:Platform.OS=='ios'? 60:20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.notifications, styles.myFavTypo]}>Notifications</Text>
            <Pressable style={styles.x} onPress={() => navigation.goBack()}>
                <Icon
                    type='ionicon'
                    name='close-outline'
                    color={theme.colors.dg}
                    size={30}
                    style={styles.icon}
                    resizeMode="cover"
                    source={require('../../../assets/x5.png')}
                />
            </Pressable>
        </View>
        <Tab.Navigator
        
            sceneContainerStyle={{ backgroundColor: theme.colors.background }}
            tabBar={props => <MyTabBar badge={new_message} width={"90%"}  {...props} />}>
            
            <Tab.Screen name="Updates" component={Notifications} />
            <Tab.Screen name="Messages">
            {(props) => <ChatListScreen {...props}   />}
        </Tab.Screen>
        </Tab.Navigator>
    </>

);
}

export default NotiMessage


const useStyles = makeStyles((theme) => ({
    notifications: {
        fontSize: moderateScale(30),
        color: theme.colors.lg,
        fontWeight: 'bold',
        marginLeft: horizontalScale(40),

        paddingBottom: 10
    },
    x: {

        marginRight: horizontalScale(20)

    },
    icon: {
        fontWeight: 'bold',
    },
}));