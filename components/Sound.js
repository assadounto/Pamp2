import { makeStyles } from '@rneui/base';
import React, { useState,useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import dings from '../assets/audio/tap.mp3'

const SoundComponent = ({ soundFile, playSound }) => {
    Sound.setCategory('Playback');

    var ding = new Sound(dings, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log(
        'duration in seconds: ' +
          ding.getDuration() +
          'number of channels: ' +
          ding.getNumberOfChannels(),
      );
    });
    useEffect(() => {
        ding.setVolume(1);
        return () => {
          ding.release();
        };
      }, []);

      const playPause = () => {
        ding.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      };
  const styles = useStyles();
return (
    <View style={styles.container}>
     
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default SoundComponent;
