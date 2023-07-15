import React from 'react';
import { Image } from 'react-native';
import {Text, View,Pressable} from 'react-native';
import {styles, colors} from '../../Common_styles';
import { FontFamily } from '../../GlobalStyles';
import gift from '../../../assets/gift.png'
const Discount= () => {
    const [color,usecolor]= React.useState('#F9B015')
    return (
  <Pressable onPress={()=> usecolor('red')}>
      <View
        style={{
          marginTop:20,
          display:'flex',
          flexDirection:'row',
         marginLeft:40,
         gap:10
          
        }} >
         <Image source={gift} style={{marginTop:10}}/>
          <View>
              <View style={{display:'flex',
          flexDirection:'row', gap:5,}}>
                  <View style={{width:9,height:9,borderRadius:50,backgroundColor:color ,marginTop:5}}></View>
                  <Text style={[colors.dg,{fontFamily:FontFamily.sourceSansProBold,fontSize:17}]}>First time Discount</Text>
              </View>
              <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:13,color:"#999999",width:300}}>Get 40% discount on your First booking on pamp, add the code firstimeD</Text>
              <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:13,color:colors.dg.color,marginTop:5}}>26/8/2021</Text>
          </View>
      </View>
      </Pressable>
    );
};

export default Discount;
