import React, { useState } from 'react';
import {Text, View, SafeAreaView,FlatList,Platform, Image, Modal,Keyboard,StyleSheet, TextInput, Alert, ScrollView} from 'react-native';
import { styles,colors } from '../../Common_styles';
import { Button,Rating } from '@rneui/base';
import { FontFamily } from '../../GlobalStyles';
import { Icon } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import StarRating from 'react-native-star-rating-widget';
import { backendURL } from '../../services/http';
import Pop2 from '../start_screens/pop2';
import { use } from '../src/redux/homeapi';
import { da } from 'date-fns/locale';
import { useGetCouponsQuery } from '../../redux/authapi';
import BHeader from '../../../components/BHeader';
import Save from '../../../components/Save';
import { useFocusEffect } from '@react-navigation/core';
import Blur from '../start_screens/Blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Discount = ({navigation}) => {
    const user = useSelector((state) => state.user.userInfo);
    const [text, setText] = useState('');
    const [notify, setNotify] = useState(false);
    const { data, isLoading, refetch } = useGetCouponsQuery({ id: user.id });
    const dispatch = useDispatch();
  
    useFocusEffect(
  
        React.useCallback(() => {
        refetch()
        }, []) // Include user.id in the dependency array
      );
      


    const handlePressOK = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/ref_code?id=${user.id}&ref_code=${text}`);
  
        if (data.message === 'ok') {
          setNotify(true);
          setTimeout(() => {
            setNotify(false);
            refetch()
          }, 3000);
        } else {
          Alert.alert('Message',data.message);
        }
      } catch (error) {
        console.error('Error applying discount code:', error);
        Alert.alert("Error",'An error occurred while applying the discount code.');
      }
    };
  
   
    
  
    return (
      <>

          <BHeader top={Platform.OS==='ios'?60:20} color={colors.dg2.color} />
          <View style={pop.pop}>
            <Text style={pop.rate}>Enter Promo Code</Text>
            <TextInput
              placeholderTextColor={'#BBB9BC'}
              placeholder="Promo Code"
              onChangeText={setText}
              style={pop.input}
            />
            <Text style={pop.text2}>The discount will be applied to your next appointment.</Text>
  
           
          </View> 
          <ScrollView contentContainerStyle={{  height:600}}>
            {data &&
              data.map((coupon) => (
                <TouchableOpacity onPress={()=>navigation.navigate('discountfull',{coupon})} style={pop.coupon} key={coupon.id}>
                  <Text style={pop.head}>{coupon.code}</Text>
                  <Text style={pop.dis}>{coupon.description}</Text>
                  <View style={pop.bar} />
                  <View style={pop.cont2}>
                    <Text style={pop.apply}>Expiry</Text>
                    <Text style={[pop.apply, pop.hour]}>{coupon.expiry}</Text>
                  </View>
                </TouchableOpacity>
                
              ))}
          </ScrollView>


       
        <Pop2 modal={notify} main="Discount code successfully applied" />
        {notify&& <Blur/>}
         <Save name="Apply" handlePress={handlePressOK} />
      </>
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
        padding:15,
        alignSelf:'center'
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
export default Discount;

