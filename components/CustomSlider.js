import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import { colors } from '../src/Common_styles';
import { Cursor } from 'react-native-confirmation-code-field';

const windowHeight = Dimensions.get('window').height;

const CustomImageSlider = ({ images, border }) => {
  const swiperHeight = windowHeight * 0.5; // Set the swiper height to 50% of the window height

  return (
    <Swiper
      loadMinimalLoader
      containerStyle={[styles.swiperContainer, { height: swiperHeight }]}
      horizontal={true}
      activeDotStyle={styles.activeDot}
      activeDotColor={'white'}
      dotColor={'#707070'}
      dotStyle={styles.dot}
    >
      {images.map((image, index) => (
        <View style={[styles.imageContainer, { height: swiperHeight }]} key={index}>
          <FastImage
            style={[styles.image, border && styles.borderBottom]}
            source={{
              uri: image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    borderBottomLeftRadius: 20,
  },
  dot:{
    width: 12,
    borderRadius: 50,
    height: 12,
  },
  activeDot: {
    width: 12,
    borderRadius: 50,
    height: 12,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  borderBottom: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
export default CustomImageSlider
