import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import {  colors } from '../../Common_styles';
import { useStyles } from './Login';
import { FontFamily } from '../../GlobalStyles';
const Header = ({ main, sub, sub2, modalVisible }) => {
  const { theme } = useTheme();
const styles=useStyles()
  return (
    <SafeAreaView style={[styles.head]}>
      <View>
        <Text style={[ styles.fs25, { color:theme.colors.dg, fontFamily: FontFamily.sourceSansProBold }]}>{main}</Text>
        <Text style={[{color: theme.colors.dg}, styles.tc]}>{sub}</Text>
        <Text style={[{ color: theme.colors.dg }, styles.tc]}>{sub2}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
