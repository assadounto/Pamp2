import React from 'react';
import {View, ImageBackground, Text, StyleSheet, Pressable} from 'react-native';

const Getting_started = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Group2.png')}
        style={styles.c1}>
        <ImageBackground
          source={require('../assets/notification_bellr.png')}
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
            onPress={() => navigation.replace('login')}>
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
  c1: {width: '100%', height: '100%'},
  c2: {
    width: '80%',
    height: '40%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
    top: 350,
    borderRadius: 40,
  },
  c3: {
    width: 400,
    height: 350,
    alignSelf: 'center',
    position: 'absolute',
    top: 90,
  },
  c4: {
    marginTop: 20,
    width: 170,
    height: 100,
    alignSelf: 'center',
  },
  c5: {
    alignSelf: 'center',
    width: 270,
    textAlign: 'center',
    color: '#D0D8C3',
    padding: 10,
  },
  c6: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#86D694',
    width: 150,
    height: 50,
  },
  c7: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    padding: 10,
  },
});
export default Getting_started;
