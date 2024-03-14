import React from 'react';
import {Text, View, SafeAreaView, Image, Modal} from 'react-native';
import {styles, colors} from '../../Common_styles';
import LottieView from 'lottie-react-native';
import { verticalScale } from '../../Dimensions';
const Pop2 = ({main, modal}) => {
  return (
    <Modal animationType='fade' transparent={true} visible={modal}>
      <View style={styles.pop2}>
      <LottieView
              source={require('../../../assets/lottie/test.json')}
              style={{ width:209, height: 150,marginTop:verticalScale(-20) }}
              autoPlay
              loop={false}
            />
        <Text style={[colors.dgb,{marginTop:verticalScale(-40)}, styles.fs18, styles.tac]}>{main}</Text>
      </View>
    </Modal>
  );
};

export default Pop2;
