import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {styles, colors} from '../../Common_styles';
import {styles1} from './VerifyNumber';
import { FontFamily } from '../../GlobalStyles';
const Header = ({main, sub, sub2, modalVisible}) => {
  return (
    <SafeAreaView style={[styles.head, modalVisible && styles1.dim]}>
      <View>
        <Text style={[colors.dgb, styles.fs25,{fontFamily:FontFamily.sourceSansProBold}]}>{main}</Text>
        <Text style={[colors.dgb, styles.tc]}>{sub}</Text>
        <Text style={[colors.dgb, styles.tc]}>{sub2}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
