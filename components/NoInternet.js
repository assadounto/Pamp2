import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/base';

import NetInfo from '@react-native-community/netinfo';
import TriviaGame from './Trivia';
import LottieView from 'lottie-react-native';
import { verticalScale } from '../src/Dimensions';
import { colors } from '../src/Common_styles';
const NoInternetComponent = ({retry}) => {
  const [isConnected, setIsConnected] = useState(false); // Initially assume no internet
  const [showComponent, setShowComponent] = useState(true); // Initially show the component
  const [playTrivia, setPlayTrivia] = useState(false); // State to track if Trivia should be played

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        // If internet connection is detected, hide the component
        setShowComponent(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    // Logic to retry connecting
    // You can modify this function according to your app's needs
  retry()
  };

  const handlePlayTrivia = () => {
    setPlayTrivia(true); // Activate trivia when "Play Trivia" button is pressed
  };

 

  return (
    <View style={{ flex: 1,backgroundColor:'red', justifyContent: 'center', alignItems: 'center' }}>
     
        <View>
        <View style={{marginTop:verticalScale(50)}}>
      <LottieView
              source={require('../assets/lottie/nointernet.json')}
              style={{ width:209, height: 150,marginTop:verticalScale(-20) }}
              autoPlay
              loop={true}
            />
      </View>
          <Button  buttonStyle={{borderRadius:20,backgroundColor:colors.dg2.color,marginBottom:10}} title="Retry" onPress={handleRetry} />
          <Button buttonStyle={{borderRadius:20,backgroundColor:colors.dg2.color}} title="Play Trivia" onPress={handlePlayTrivia} />
        </View>
      
      {playTrivia && <TriviaGame />}
    </View>
  );
};

export default NoInternetComponent;
