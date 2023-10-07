import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal,Keyboard,StyleSheet, TextInput} from 'react-native';
import { styles,colors } from '../src/Common_styles';
import { Button,Rating } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import { Icon } from '@rneui/base';
import { useDispatch } from 'react-redux';
import { showBottom } from '../src/redux/user';

import axios from 'axios';
import StarRating from 'react-native-star-rating-widget';
import { backendURL } from '../src/services/http';
import Pop2 from '../src/screens/start_screens/pop2';
import { use } from '../src/redux/homeapi';
const Discount_pop = ({setmodal,vendor, modal,setblur,id}) => {
    const [text,setText]=useState('')
    const [poph,setpop]=useState(400)

    const [open,setOpen]=useState(false)
    const [notify,set_notify] =useState(false)
   const handlepressCancel=()=>{
  dispatch(showBottom(true))
    setmodal(false)
    }
    const dispatch=useDispatch()
    const handlePressOK=async()=>{
    //const {data}= axios.post(`${backendURL}/booking/notes`,{id: id,notes: text })
   setmodal(false)
    set_notify(true);
    setTimeout(() => {
        set_notify(false);
        setblur(false);
      }, 3000);
    }

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setpop(200)
        });
    
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setpop(400)
        });
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);
  return (
    <><Modal animationType="slide" transparent={true} visible={modal}>
          <View style={[pop.pop,{top:poph}]}>
         <View style={pop.notes}>
            <Icon 
            onPress={handlepressCancel}
            name='close-outline'
            type='ionicon'
             size={40}
             color={'#00463C'}
            />

         </View>
         <Text style={pop.rate}>Enter Promo Code</Text>
        
        <TextInput     placeholderTextColor={'#BBB9BC'} placeholder='Promo Code' onChangeText={setText}  style={[pop.input]}/>
        <Text style={pop.text2}>The discount will be applied to your next appointment.</Text>
       {
       text.length>3 &&(
            <View style={pop.coupon}>
            <Text style={pop.head}>Your Discount</Text>
            <Text style={pop.dis}>40% discount for 1 appointment</Text>
            <View style={pop.bar}/>
            <View style={pop.cont2}>
                <Text style={pop.apply} >Applied</Text>
                <Text style={[pop.apply,pop.hour]} > 24 hours left</Text>
            </View>
        </View>
        )
       }
        <View style={{ position: 'absolute', bottom: 20 }}>
            <Button
              onPress={handlePressOK}
              buttonStyle={{ borderRadius: 40, backgroundColor: colors.dg2.color, width: 120, height: 40 }}
              title='apply'
            />
          </View>
          </View>
      </Modal><Pop2 modal={notify} main={'Discount code successfully applied'}/></>
  );
};
const pop=StyleSheet.create({
    hour:{
      textAlign:'right'
    },
    apply:{
        color:'#A8B8A1',
        fontFamily: FontFamily.sourceSansProRegular,
        fontSize:10 ,
        flex:1
    },
    cont2:{
        display:'flex',
        flexDirection:'row'
    }
    ,
    bar:{
        backgroundColor:'#E8F9E0',
         marginVertical:10,
        height:2
    },
    dis:{
        color:'#00463C',
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize:18
    },
    head:{
        color:'#A8B8A1',
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize:12,marginBottom:10
    }
    ,
    coupon:{
        marginTop:20,
        backgroundColor:'#DAECD2',
        borderRadius:15,
        width:'90%',
        padding:15
    },
    rate:{
    fontFamily: FontFamily.sourceSansProSemibold,
    color: '#00463C',
    fontSize:24,
    marginBottom:20
    },
    pop:{
        width: '95%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 10,
        top:400,height:400
    },
    h1:{
        fontFamily:FontFamily.sourceSansProSemibold,
        fontSize:24,
        width:'80%',
        marginVertical:20
    },
    h2:{
        fontFamily: FontFamily.sourceSansProRegular,
        fontSize:14,
        width:'80%'
    },
    h3:{
        fontFamily:FontFamily.sourceSansProSemibold,
        fontSize:14,
        marginVertical:20
        
    },
    h4:{
        color: colors.lg.color
    },
    notes:
    {
        alignSelf:'flex-end',
        marginRight: 10,
     
    },
    input:{
        width:'90%',
        height:46,
     borderColor:'#EFEFEF',
     borderWidth:1,
     borderRadius:10,
     padding:13,
     paddingTop:10,
     marginVertical:10
    },
    text2:{
        color:'#BBB9BC',
        fontFamily: FontFamily.sourceSansProRegular,
        marginHorizontal:20,
        fontSize:11
       

    }


})
export default Discount_pop;

