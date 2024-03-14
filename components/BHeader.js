import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {Header, Icon} from '@rneui/base';
import {styles, colors} from '../src/Common_styles';
import { useNavigation } from '@react-navigation/core';
import { FontFamily } from '../GlobalStyles';

const BHeader = ({title, subtitle, back,bg, color,setDateVisible,close,top}) => {
  const navigation=useNavigation()
  return (
    <View style={[color, {  marginBottom: 20 ,marginTop:top||10}]}>
     
   
      <Text style={[styles.f1,{textAlign:'center',fontFamily:FontFamily.sourceSansProSemibold,marginHorizontal:30}, color?{color}: colors.dg]}>{title}</Text>
      {subtitle ? <Text style={{textAlign:'center',fontFamily:FontFamily.sourceSansProRegular,fontSize:14,color:colors.dg.color}}>{subtitle}</Text> : null}
      <View style={{position:'absolute',left:20}}>
      <Icon name="chevron-back" size={30} type="ionicon" onPress={() => {close? setDateVisible(false): navigation.goBack() }} />
      </View>
  </View>
  
  
  );
};

BHeader.propTypes = {
  back: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

BHeader.defaultProps = {
  subtitle: '',
  back: true,
};

export default BHeader;
