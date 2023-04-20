import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {Header, Icon} from '@rneui/base';
import {styles, colors} from '../src/Common_styles';

const BHeader = ({title, subtitle, back, color,navigation}) => {
  return (
    <View style={[color, {display:'flex',flexDirection:'row',marginLeft: 20,marginTop:30, marginBottom:30}]}>
      {back ? (
        <Icon name="chevron-back" size={30} type="ionicon" onPress={() =>{} } />
      ) : null}
      <View style={{marginLeft:50}}>
        <Text style={[styles.f1, colors.lg, styles.bold]}>{title}</Text>
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
