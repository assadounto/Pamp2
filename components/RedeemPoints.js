import { makeStyles } from '@rneui/themed';
import { useTheme, Button, Icon} from '@rneui/themed';
import React from 'react';
import { FontFamily } from '../GlobalStyles';
import { Text, View, SafeAreaView, Image, Modal,Pressable, Linking } from 'react-native';
import { colors } from '../../Common_styles';
import LottieView from 'lottie-react-native';
import { verticalScale, horizontalScale } from '../src/Dimensions';
import Blur from '../src/screens/start_screens/Blur';

const RedeemModal= ({ modal, disabled, setModal, navigation }) => {
    const { theme } = useTheme();
    const styles = useStyles();

    const handleSubmit = () => {

        setModal(!modal)
        Linking.openURL('https://www.trypamp.com/redeem?i').catch((err) =>
            console.error("An error occurred while opening the link: ", err)
        );
    }
    return (
        <><Modal animationType='fade' transparent={true} visible={modal}>
            <View style={styles.pop2}>
                <Text style={styles.title}>Loyalty Points</Text>
                <Pressable onPress={() => setModal(!modal)} style={styles.close}>
                    <Icon
                        type='ionicon'
                        size={35}
                    
                        name='close-outline'
                        color={theme.colors.dg}
                    />
                </Pressable>
                <Text style={[{ color: theme.colors.dg, textAlign: 'center', fontSize: 16,  }, styles.fs18, styles.tac]}>{'You can redeem exciting rewards like airtime, mobile data, pampering beauty sessions and more when you reach 1000+ points'}</Text>
                <Button
                disabled={disabled}
                    title="Redeem Points"
                    onPress={handleSubmit}
                    titleStyle={{ fontSize: 12 }}
                    disabledStyle={{backgroundColor:theme.colors.disabled}}
                    disabledTitleStyle={{color:'#BBB9BC',fontSize:12}}
                    buttonStyle={styles.button} />

            </View>
        </Modal>
            {modal && <Blur />}
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    button: {
      width:200,
        height: verticalScale(53),
        backgroundColor: theme.colors.lg,
        marginBottom: verticalScale(10),
        marginTop: 30,
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        borderRadius: 30
    },
    pop2: {
        position: 'absolute',
        bottom: verticalScale(40),
        backgroundColor: theme.colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: horizontalScale(20),
        alignSelf: 'center',
        padding: horizontalScale(40),
        alignContent: 'center',

        width: '90%',
      
    },
    text: {
        color: theme.colors.primary,
    },
    title: {
        fontFamily: FontFamily.sourceSansProBold,
        fontSize: 24,
        
        color: theme.colors.dg,
        textAlign: 'center',
        marginTop:20,
        marginBottom:10
    },
    close: {
        position: "absolute",
        right: 30,
        top: 25
    },
}));

export default RedeemModal