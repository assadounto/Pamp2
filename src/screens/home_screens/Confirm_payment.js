import React, { useState } from "react";
import { SafeAreaView ,View,Text,Pressable} from "react-native";
import BHeader from "../../../components/BHeader";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { Icon,Button } from "@rneui/base";
import { Image } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

const Confirm_payment=({navigation})=>{
   
    return(
        <SafeAreaView>
            <ScrollView
            contentContainerStyle={{backgroundColor:'white'}}
            > 
                <BHeader title={'Confirm Payment'}/>
                <Text style={{paddingLeft:20, width: '90%',alignSelf:'center',marginVertical:20,fontFamily:FontFamily.sourceSansProSemibold,fontSize:18,color:colors.dg.color}}>Payment Method</Text>
                <Pressable style={{ display:'flex',flexDirection:'row', height:63, width: '90%',alignSelf:'center',paddingTop:20, paddingHorizontal:20,shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},backgroundColor:'white', borderRadius:20}}> 
                <Text style={{fontFamily:FontFamily.sourceSansProBold,fontSize:20,color:colors.dg.color}}>Select</Text>
          <Icon 
           style={{width:30,marginLeft: 240}}
                      name={'chevron-forward'}
                      type="ionicon"
                      onPress={() => setShowPassword(!showPassword)}
                      color={colors.dg.color}
                    />
       </Pressable>
       <View style={{marginTop:40, marginVertical:10, shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},backgroundColor:'white', borderRadius:20,width:'90%',alignSelf:'center' }}>
        <View style={{padding:20,borderBottomColor:colors.lg.color,borderBottomWidth:1,display:'flex',flexDirection:'row'}}>
            <View>
                <Text  style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:23,color:colors.dg.color}}>12 July 2022</Text>
             <View style={{display:'flex',flexDirection:'row'}}>
             <Image
        source={require('../../../assets/group-1820.png')}/>
                <Text style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:18,color:colors.dg.color}}>Likkle salon</Text>
             </View>
             </View>
             <Pressable onPress={() => navigation.navigate('edit_profile')}>
              <Icon
                name="edit-2"
                type="feather"
                size={18}
                style={{
                marginLeft:160,
                  marginTop: 12,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: colors.lg.color,
                  padding: 5,
                  color: colors.dg2.color,
                }}
              />
            </Pressable>
        </View>
        <View style={{padding:20,borderBottomColor:colors.lg.color,borderBottomWidth:1}}>
        <View style={{display:'flex',flexDirection:'row'}}>
                <View>
                    <Text style={{fontFamily: FontFamily.sourceSansProSemibold,fontSize:18,color:colors.lg.color}}>Hair-<Text style={{color:'#BBB9BC',fontSize:9,marginTop:-10}}>Braids and twist</Text></Text>
                    <Text style={{fontFamily: FontFamily.sourceSansProSemibold,fontSize:13,color:'#BBB9BC'}}>2 hours 30min- 2services</Text>
                    <Text style={{color:colors.lg.color}}>9am-11:30am</Text>
                </View>
                <Text style={{marginLeft:125,fontFamily:FontFamily.sourceSansProBold,fontSize:18,color:colors.dg.color}}>200</Text>
            </View>
        <View style={{marginVertical:20, padding:10,borderRadius:10 ,backgroundColor:'#B0EBBD40', width:'100%',alignSelf:'center',display:'flex',flexDirection:'row'}}> 
        <Icon
                name="clock"
                type="feather"
                size={18}
                /> 
                <Text style={{height:55,marginLeft:20,flexWrap:'wrap',fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:colors.dg.color}}>Reschedule up to 72 hours before appointment</Text>
         </View>
        </View> 
      <View style={{padding:20,display:'flex',flexDirection:'row',height:100}}>
      <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:16,color:colors.dg.color}}>
        Total
      </Text>
      <Text style={{fontFamily:FontFamily.sourceSansProBold,fontSize:18,color:colors.lg.color,marginLeft:230}}>
        200
      </Text>
      </View>
       </View>
       <Button
          title={'Confirm'}
          // containerStyle={}
          buttonStyle={{
            width: 184,
            height: 54,
            //margin: 'auto',
            marginBottom: 20,
            marginTop: 10,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: colors.dg2.color,
            shadowColor: colors.lg.color, shadowOpacity: 0.5, shadowRadius: 5, shadowOffset: { width: 5, height: 0 }
          }}
          onPress={() => navigation.navigate('Success')} />
       </ScrollView>
        </SafeAreaView>
    )
}

export default Confirm_payment