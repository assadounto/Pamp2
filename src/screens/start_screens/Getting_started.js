import React from 'react';
import { View, ImageBackground,Image, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { FontFamily } from '../../GlobalStyles';

const Getting_started = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Group2.png')}
        style={styles.c1}
      >
        <ImageBackground
          source={require('../assets/Group1.png')}
          style={styles.c3}
        />
        <View style={styles.c2}>
          <Image
          resizeMode='contain'
            source={require('../assets/Group3.png')}
            style={styles.c4}
          />
          <Text style={styles.c5}>
            Experience a stress-free way of booking appointments, No more
            queues, No more delays & No more waiting!{' '}
          </Text>
          <Pressable
            style={styles.c6}
            onPress={() => navigation.replace('login2')}
          >
            <Text style={styles.c7}>Get Started</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
  c1: {
    width: '100%',
    height: '100%',
  },
  c2: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.35,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
    top: screenHeight * 0.48,
    borderRadius: 40,
  },
  c3: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.39,
    alignSelf: 'center',
    position: 'absolute',
    top: screenHeight * 0.18,
  },
  c4: {
    marginTop: screenHeight * 0.035,
    width: screenWidth * 0.34,
    height: screenHeight * 0.1,
    alignSelf: 'center',
  },
  c5: {
    alignSelf: 'center',
    width: screenWidth * 0.6,

    textAlign: 'center',
    color: '#D0D8C3',
    padding: 10,
    fontSize: 13,
    marginBottom: 10,
    marginTop: screenHeight * 0.0193,
  },
  c6: {
    alignSelf: 'center',
    borderRadius: 23,
    backgroundColor: '#86D694',
    width: screenWidth * 0.46,
    height: screenHeight * 0.052,
    marginTop: screenHeight * 0.01,
    marginBottom: 10,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  c7: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: FontFamily.sourceSansProBold,
    textAlign: 'center',
    padding: 10,
   
  },
});

export default Getting_started;
