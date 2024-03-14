import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal,StyleSheet, TextInput,Keyboard} from 'react-native';
import { styles,colors } from '../src/Common_styles';
import { Button,Rating } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import { Icon } from '@rneui/base';
import axios from 'axios';
import { delete_rating } from '../src/redux/user';
import StarRating from 'react-native-star-rating-widget';
import { backendURL } from '../src/services/http';
import Pop2 from '../src/screens/start_screens/pop2';
import { useDispatch,useSelector } from 'react-redux';

const Rating_pop = ({setmodal,vendor, modal,setInfoModal}) => {
  const dispatch= useDispatch()
  const [poph,setpop]=useState(400)
  const user = useSelector(state=>state.user.userInfo)
    const [text,setText]=useState('')
    const [rating, setRating] = useState(0);
  
   const handlepressCancel=()=>{

    setmodal(!modal)
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
    const handlePressOK=async()=>{
   
   const {data}= await axios.post(`${backendURL}/rating`,{id: user?.id,vendor_id: vendor[0], rating, description:text })
   console.log(data)
   if (data=='created'){
    dispatch(delete_rating(vendor.id))
        setmodal(false)
        setInfoModal(true);
        setTimeout(() => {
             setInfoModal(false);
           }, 3000);

   }
   
    }
  return (
    <><Modal animationType="slide" transparent={true} visible={modal}>
          <View style={[pop.pop,{top: poph}]}>
         <View style={pop.notes}>
            <Icon 
            onPress={handlepressCancel}
            name='close-outline'
            type='ionicon'
             size={40}
             color={'#00463C'}
            />

         </View>
         <Text style={pop.rate}>Rate your experience with {vendor[1]} </Text>
         <StarRating
          starSize={50}
          starStyle={{marginRight:0}}
         color='#86D694'
        rating={rating}
        onChange={setRating}
      />
        <TextInput  placeholder='leave note..' onChangeText={setText}    multiline={true} style={pop.input}/>
          <Button onPress={handlePressOK} buttonStyle={{ borderRadius: 40, backgroundColor: colors.dg2.color, width: 120, height: 40 }} title='Send'>

                  </Button>
          </View>
      </Modal></>
  );
};
const pop=StyleSheet.create({
    rate:{
    fontFamily: FontFamily.sourceSansProSemibold,
    color: '#00463C',
    marginBottom:20,fontSize:20
    },
    pop:{
        width: '95%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 10,
        top:400
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
        height:100,
     borderColor:'#EFEFEF',
     borderWidth:1,
     borderRadius:10,
     padding:10,
     paddingTop:10,
     marginVertical:30
    }

})
export default Rating_pop;

