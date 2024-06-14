import { makeStyles } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import React from 'react';
import {Text, View, SafeAreaView, Image, Modal} from 'react-native';
import {styles, colors} from '../../Common_styles';

const Pop = ({main, modal}) => {
  const { theme} = useTheme();
return (
    <Modal animationType="slide" transparent={true} visible={modal}>
      <View style={styles.pop2}>
        <Image
          source={require('../../../assets/check.png')}
          style={styles.popimg}
        />
        <Text style={[colors.dgb, styles.fs18, styles.tac]}>{main}</Text>
      </View>
    </Modal>
  );
};

export default Pop;
