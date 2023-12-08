import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../src/Common_styles';

const ImageCont = ({ styles, uri,smallStyle }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <>
      {imageLoading && (
        <ActivityIndicator size="large" color={colors.dg.color} style={ smallStyle?smallStyle: styles2.loadingIndicator} />
      )}
      <FastImage
        style={styles}
        source={{
          uri: uri,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={handleImageLoad}
      />
    </>
  );
};

const styles2 = StyleSheet.create({
  loadingIndicator: {
    position:'absolute',
    top: '50%',
    left: '45%',
    zIndex: 1,
  },
});

export default ImageCont;
