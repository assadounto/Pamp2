import { makeStyles } from '@rneui/themed';
import { useTheme,Button } from '@rneui/themed';
import React from 'react';
import { Text, View, SafeAreaView, Image, Modal } from 'react-native';
import { colors } from '../../Common_styles';
import LottieView from 'lottie-react-native';
import { verticalScale,horizontalScale } from '../src/Dimensions';
import Blur from '../src/screens/start_screens/Blur';

const ThankYou = ({modal,setModal,navigation}) => {
  const { theme } = useTheme();
  const styles = useStyles();

  const handleSubmit=()=>{
    
    setModal(!modal)
    navigation.navigate('main')
  }
  return (
    <><Modal animationType='fade' transparent={true} visible={modal}>
      <View style={styles.pop2}>
<Image style={styles.img} resizeMode='contain' source={require('../assets/influencers.png')}/>
        <Text style={[{ color: theme.colors.dg, width:'80%', textAlign: 'center', fontSize: 16, }, styles.fs18, styles.tac]}>{'Thank you for your interest in\nbecoming a Pamp influencer. Your submission is now under review.'}</Text>
        <Button
          title="Got it"
         onPress={handleSubmit}
          buttonStyle={styles.button} />

      </View>
    </Modal>
{   modal&& <Blur />}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    height: verticalScale(53),
    backgroundColor: theme.colors.lg, 
    marginBottom: verticalScale(25),
    marginTop:20,
    alignSelf: 'center',
    borderRadius: 25
  },
  img:{
    width:'80%',

  },
  pop2: {
    position: 'absolute',
    bottom: verticalScale(40),
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    padding: horizontalScale(0),
    alignContent: 'center',

    width: '95%',
  },
  text: {
    color: theme.colors.primary,
  },
}));

export default ThankYou;