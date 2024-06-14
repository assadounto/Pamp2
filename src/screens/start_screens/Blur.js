import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { Text, View } from 'react-native';
import { styles, colors } from '../../Common_styles';

const Blur = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: 0,
      }}
    />
  );
};

export default Blur;
