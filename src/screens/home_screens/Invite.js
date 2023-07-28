import React from 'react';
import {View, ImageBackground, Text, StyleSheet, Pressable,Share, TouchableOpacity} from 'react-native';
import BHeader from '../../../components/BHeader';
import { colors } from '../../Common_styles';
import { FontFamily } from '../../GlobalStyles';
import Clipboard from '@react-native-clipboard/clipboard';
const Invite = ({navigation}) => {
  const [noti, shownoti] = React.useState(false);
  
  const copyToClipboard = () => {
    Clipboard.setString('hello world');
    shownoti(true)
    setTimeout(()=>{
     shownoti(false)
    },3000
    )
  };


  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'This is my share code yugvujg',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
     
      <ImageBackground
        source={require('../assets/Group2.png')}
        style={styles.c1}>
          <View style={styles.head}>
           <BHeader title='pamp' color={'#86D694'}/>
           {
            noti && 
            <View style={styles.copy_info}>
               <Text style={styles.copy_info_text}>Referral code copied!</Text>
           </View>
           }
           
           </View>
        <ImageBackground
          source={require('../../../assets/excited.png')}
          style={styles.c3}
        />
        <View style={styles.c2}>
          <ImageBackground
          resizeMode='contain'
           source={require('../../../assets/savehere.png')}
            style={styles.c4}
          />
          <Text style={styles.c5}>
          {'Invite your friends and get GHC10 off 1 appointments'}
          </Text>
          <View style={styles.copy}>
            <Text style={styles.code}>d2xw2d</Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.copy_text}><Text>copy</Text></TouchableOpacity>
          </View>
          <Pressable
            style={styles.c6}
            onPress={onShare}>
            <Text style={styles.c7}>Invite Friends</Text>
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
  head:{
    marginTop:50
  },

  text: {
    fontSize: 30,
  },
  c1: {width: '100%', height: '100%' },
  c2: {
    width: '80%',
    height: '45%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    borderRadius: 40,
  },
  c3: {
    width: 320,
    height: 310,
    alignSelf: 'center',
    position: 'absolute',
    top: '18%',
  },
  c4: {
    marginTop: 15,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  c5: {
    alignSelf: 'center',
    fontFamily:FontFamily.sourceSansProRegular,
    width: 269,
    textAlign: 'center',
    color: '#D0D8C3',
    padding: 10,
    fontSize:20,
    marginBottom:5

  },
  c6: {
    alignSelf: 'center',
    borderRadius: 23,
    backgroundColor: '#86D694',
    width: 184,
    height: 52,
    marginTop:10,
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
  copy:{
    display:'flex',
    flexDirection:'row',
    width:200,
    height:40,
    //justifyContent: 'center',
  alignSelf:'center',
    borderColor: colors.lg.color,
    borderWidth:1,
    
    borderRadius: 10,marginBottom:5
  },
  copy_text:{
  left:100,
  top:10
  },
  code:{
    top:10,
    left:10,
    color:colors.dg.color
  },
  copy_info:{
    width: '90%',
    position:'absolute',
    alignSelf:'center',
    top:60,
    height:32,
    borderRadius:23,
    backgroundColor:'white'
  },
  copy_info_text:{
    fontFamily:FontFamily.sourceSansProRegular,
    fontSize:14,
    left:20,
    top:5,
    color:colors.dg.color
  }
});
export default Invite;
