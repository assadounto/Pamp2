import React from 'react';
import { Image } from 'react-native';
import {Text, View,Pressable} from 'react-native';
import { FLUSH } from 'redux-persist';
import {styles, colors} from '../../Common_styles';
import { FontFamily } from '../../GlobalStyles';
import mail from '../../../assets/mail.png'
import { formatDate } from '../../Functions';
import { horizontalScale, moderateScale, verticalScale } from '../../Dimensions';
const Normal= ({data}) => {
    const [color,usecolor]= React.useState('#F9B015')
  return (
<Pressable onPress={()=> usecolor('red')}>
    <View
      style={{
        marginTop:verticalScale(20),
        display:'flex',
        flexDirection:'row',
       marginHorizontal:40,
       gap:10
        
      }} >
       <Image source={mail} style={{marginTop:10}}/>
        <View>
            <View style={{display:'flex',
        flexDirection:'row', gap:5,}}>
{!data.read &&
              <View style={{ width: 9, height: 9, borderRadius: 50, backgroundColor: color, marginTop: 5 }}></View>
            }              
            
          <Text style={[colors.dg,{fontFamily:FontFamily.sourceSansProBold,fontSize:moderateScale(17)}]}>{data.title}</Text>
            </View>
            <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:moderateScale(13),paddingRight:30,color:"#999999"}}>{data.body.trimEnd()}</Text>
            <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:moderateScale(13),color:colors.dg.color,marginTop:5}}>{formatDate(data.created_at)}</Text>
        </View>
    </View>
    </Pressable>
  );
};

export default Normal;
