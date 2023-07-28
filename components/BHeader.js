import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {Header, Icon} from '@rneui/base';
import {styles, colors} from '../src/Common_styles';
import { useNavigation } from '@react-navigation/core';

const BHeader = ({title, subtitle, back, color}) => {
  const navigation=useNavigation()
  return (
    <View style={[color, { flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 30, marginBottom: 30 }]}>
    {back ? (
      <Icon style={{ flex: 1 }} name="chevron-back" size={30} type="ionicon" onPress={() => { navigation.goBack() }} />
    ) : null}
    <View style={{marginLeft:'20%'}}>
      <Text style={[styles.f1, color?{color}: colors.lg, styles.bold]}>{title}</Text>
      {subtitle ? <Text style={[]}>{subtitle}</Text> : null}
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
