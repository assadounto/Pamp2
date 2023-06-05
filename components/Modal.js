import { Background } from '@react-navigation/elements';
import React from 'react';
import {Text, View,StyleSheet, SafeAreaView, Image, Modal,Pressable,FlatList} from 'react-native';
import { FontFamily } from '../src/GlobalStyles';
import { styles,colors } from '../src/Common_styles';


const data =['MTN','VODAFONE','AIRTELTIGO']

const Modal_Pop = ({main, modal,onchange,setOption}) => {
  return (
    <><Modal animationType="slide" transparent={true} visible={modal}>

<View style={[styles.pop2,{marginTop:'140%', padding:0,height:200}]}>
<FlatList style={md_style.momo_cont}
        data={data}
        renderItem={({item}) => (
          
            <View style={md_style.info} ><Text onPress={()=>{setOption(item) ;onchange(false)}} style={md_style.text}>{item}</Text></View>
       
        )}
        keyExtractor={item => item}
      
        
      />
 </View>



        
         <Pressable style={{ alignItems:'center',
        justifyContent: 'center',backgroundColor:'white',marginTop:10,height:54,
         borderRadius:18,width:'95%',alignSelf:'center'}} onPress={()=>onchange(false)}><Text style={md_style.text}>BACK</Text></Pressable> 
          </Modal>
     </>
  );
};

export default Modal_Pop;
const md_style= StyleSheet.create({
    momo_cont: {
        width:'90%',
      
    },
    info:{
        borderBottomColor:'#B0EBBD',
        borderBottomWidth:0.5,
        height:60,
        alignItems:'center',
        justifyContent: 'center'
    },
    text:{
        fontFamily:FontFamily.sourceSansProSemibold,
        fontSize:16,
        color:"#00463C"

    }
})