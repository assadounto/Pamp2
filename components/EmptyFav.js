import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { Button } from "@rneui/base";
import { horizontalScale,verticalScale,moderateScale } from "../src/Dimensions";
import { colors } from "../src/Common_styles";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { setNextNav } from "../src/redux/user";

const Emptyfav = ({title,body,top=verticalScale(80),showBtn,col,mt}) => {
  const navigation= useNavigation()
  const dispatch= useDispatch()
  return (
    <View style={[styles.component45,{top:top}]}>
      <Image
        style={styles.component45Child}
        resizeMode="contain"
        source={require("../assets/group-2143.png")}
      />
      <Text style={[styles.noFavourites, styles.youDontHaveTypo]}>
       {title}
      </Text>
      <Text style={[styles.youDontHave, styles.youDontHaveTypo,{color: col ?col:colors.dg.color,marginTop:mt?mt:null,fontFamily: FontFamily.sourceSansProRegular}]}>
        {body}
      </Text>
      {showBtn&& <Button
           titleStyle={{fontSize:moderateScale(14), fontFamily:FontFamily.sourceSansProBold,color:colors.dg2.color}}
            title={'Log in or sign up'}
           
            // containerStyle={}
            buttonStyle={{

              width: horizontalScale(184),
              height: verticalScale(45),
              //margin: 'auto',

              marginBottom: 20,
              marginTop: 20,
              alignSelf: 'center',
              borderRadius: 40,
              borderColor:colors.dg2.color,
              borderWidth:2,
              
              backgroundColor: colors.w.color,
            }}
            onPress={()=>{
              dispatch(setNextNav('Favourites'))
              navigation.navigate('login')
            }
              
            }
             />}
    </View>
  );
};

const styles = StyleSheet.create({
  youDontHaveTypo: {
    textAlign: "center",
    color: colors.dg.color,

    
  },
  component45Child: {
    height: verticalScale(150),
    width: "60.83%",


alignSelf:'center',

    maxHeight: "100%",
    overflow: "hidden",


  },
  noFavourites: {
    fontFamily: FontFamily.sourceSansProBold,
   marginTop:40,
    fontSize: FontSize.size_xl,
  },
  youDontHave: {
 

    fontSize: FontSize.size_lg,
  },
  component45: {
    top: 211,
    width: '80%',    height: 294,
    alignSelf:'center'
  },
});

export default Emptyfav;
