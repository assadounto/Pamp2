import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { Text, View, SafeAreaView, Image, Modal } from 'react-native';
import { colors } from '../../Common_styles';
import LottieView from 'lottie-react-native';
import { verticalScale, horizontalScale } from '../../Dimensions';
const Pop2 = ({ main, modal }) => {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <Modal animationType='fade' transparent={true} visible={modal}>
      <View style={styles.pop2}>
        <LottieView
          source={require('../../../assets/lottie/test.json')}
          style={{ width: 209, height: 150, marginTop: verticalScale(-20) }}
          autoPlay
          loop={false}
        />
        <Text style={[ {color: theme.colors.lg, textAlign:'center', fontSize:18,  marginTop: verticalScale(-40) }, styles.fs18, styles.tac]}>{main}</Text>
      </View>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
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

    width: '95%',
    height: verticalScale(250),
  },



}))

export default Pop2;
