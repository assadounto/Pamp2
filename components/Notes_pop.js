import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal,StyleSheet, TextInput,Keyboard} from 'react-native';
import { styles,colors } from '../src/Common_styles';
import { Button } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import Pop from '../src/screens/start_screens/pop';
import { Icon } from '@rneui/base';
import axios from 'axios';
import { backendURL } from '../src/services/http';
import Pop2 from '../src/screens/start_screens/pop2';
const Notes_pop = ({setcancel, modal,setblur,id}) => {
    const [notify_cancel,set_notify]=useState(false)
    const [poph,setpop]=useState(400)
    const [text,setText]=useState('')
   const handlepressCancel=()=>{
    setblur(false);
    setcancel(false)
    }

    const handlePressOK=async()=>{
    const {data}= axios.post(`${backendURL}/booking/notes`,{id: id,notes: text })
    setcancel(false)
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
          <View style={{
        width: '95%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 10,
        top:poph
    }}>
         <View style={pop.notes}>
            <Icon 
            onPress={handlepressCancel}
            name='close-outline'
            type='ionicon'
             size={40}
             color={'#00463C'}
            />

         </View>
         
        <TextInput  placeholder='leave note..' onChangeText={setText}    multiline={true} style={pop.input}/>
          <Button titleStyle={{fontFamily:FontFamily.sourceSansProBold}} onPress={handlePressOK} buttonStyle={{ borderRadius: 40, backgroundColor: colors.dg2.color, width: 120, height: 40 }} title='Send'>

                  </Button>
          </View>
      </Modal><Pop2 main={'Note successfully sent to Likkle salon'} modal={notify_cancel}/></>
  );
};
const pop=StyleSheet.create({
  
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
        height:100,
     borderColor:'#EFEFEF',
     borderWidth:1,
     borderRadius:10,
     padding:10,
     paddingTop:10,
     marginVertical:30
    }

})
export default Notes_pop;

