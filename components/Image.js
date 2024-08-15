import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@rneui/themed';
const ImageCont = ({booking=false, styles, uri, thumbnailUri, smallStyle }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
const {theme}=useTheme()
  return (
    <View style={[, smallStyle, imageLoading && styles2.placeholder]}>
      {imageLoading && thumbnailUri ? (
        <FastImage
          style={styles}
          source={{ uri: thumbnailUri }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <FastImage
          style={styles}
          source={{
            uri: uri,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          onLoad={handleImageLoad}
          onError={() => setImageLoading(false)} // Handle error
        />
      )}
      {imageLoading && !thumbnailUri && (
        <ActivityIndicator
          size="small"
          color={theme.colors.dg}
          style={[styles2.spinner,booking &&{top:100}]}
        />
      )}
    </View>
  );
};

const styles2 = StyleSheet.create({

  placeholder: {
    borderRadius:20,
    backgroundColor: '#e0e0e0', // Placeholder background color
  },
  image: {
    width: '100%',
    height: '100%',
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // transform: [{ translateX: -12.5 }, { translateY: -12.5 }], // Center the spinner
  },
});

export default ImageCont;
