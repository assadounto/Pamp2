import { makeStyles } from '@rneui/base';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../src/Common_styles';

const ImageCont = ({ styles,show, uri,smallStyle }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };


return (
    <>
    
      <FastImage
        style={styles}
        source={{
          uri: uri,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
       
      />
    </>
  );
};



export default ImageCont;
