import React from 'react';
import {View, ImageBackground, Text, StyleSheet, Pressable} from 'react-native';
import { FontFamily } from '../../GlobalStyles';
const Getting_started = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Group2.png')}
        style={styles.c1}>
        <ImageBackground
          source={require('../assets/Group1.png')}
          style={styles.c3}
        />
        <View style={styles.c2}>
          <ImageBackground
            source={require('../assets/Group3.png')}
            style={styles.c4}
          />
          <Text style={styles.c5}>
            Experience a stress-free way of booking appointments, No more
            queues, No more delays & No more waiting!{' '}
          </Text>
          <Pressable
            style={styles.c6}
            onPress={() => navigation.replace('login2')}>
            <Text style={styles.c7}>Get Started</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
  c1: {width: '100%', height: '100%' },
  c2: {
    width: '80%',
    //height: '40%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
    top: 340,
    borderRadius: 40,
  },
  c3: {
    width: 400,
    height: 370,
    alignSelf: 'center',
    position: 'absolute',
    top: 50,
  },
  c4: {
    marginTop: 35,
    width: 170,
    height: 100,
    alignSelf: 'center',
  },
  c5: {
    alignSelf: 'center',
    width: 269,
    height:70,
    textAlign: 'center',
    color: '#D0D8C3',
    padding: 10,
    fontSize:13,
    marginBottom:10,
    marginTop:19.3

  },
  c6: {
    alignSelf: 'center',
    borderRadius: 23,
    backgroundColor: '#86D694',
    width: 184,
    height: 52,
    marginBottom:10
  },
  c7: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: FontFamily.sourceSansProBold,
   

    padding: 15,
  },
});
export default Getting_started;
