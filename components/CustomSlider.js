import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;

const CustomImageSlider = ({ images, border }) => {
  const swiperHeight = windowHeight * 0.5; // Set the swiper height to 50% of the window height

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <Swiper
      loadMinimalLoader
      containerStyle={[styles.swiperContainer, { height: swiperHeight }]}
      horizontal={true}
      activeDotStyle={styles.activeDot}
      activeDotColor={'white'}
      dotColor={'#707070'}
      paginationStyle={styles.pagination}
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

const useStyles = makeStyles((theme) => ({
  swiperContainer: {
    borderBottomLeftRadius: 20,
    overflow: 'hidden', // Ensure that content within the swiper does not overflow
  },
  pagination: {
    position: 'absolute',
    overflow:'scroll',
    bottom: 10, // Adjust this value to position dots vertically
    left: '50%', // Center the pagination horizontally
    transform: [{ translateX: -50 }], // Adjust for the fixed width
    width: 100, // Fixed width for pagination container
    alignItems: 'center', // Center dots horizontally
    flexDirection: 'row', // Ensure dots are in a row
    justifyContent: 'center', // Center dots within the fixed width
  },
  dot: {
    width: 8, // Adjust dot size
    height: 8, // Adjust dot size
    borderRadius: 4, // Ensure dots are circular
    backgroundColor: '#707070', // Default dot color
    marginHorizontal: 4, // Add spacing between dots
  },
  activeDot: {
    width: 12, // Adjust size of the active dot
    height: 12, // Adjust size of the active dot
    borderRadius: 6, // Ensure active dot is circular
    backgroundColor: 'white', // Active dot color
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden', // Ensure image does not overflow
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
}));

export default CustomImageSlider;
