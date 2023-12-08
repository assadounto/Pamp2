import React, { Fragment, useState } from 'react';
import { Image } from 'react-native';
import {Text, View,Pressable} from 'react-native';
import { Button } from '@rneui/base';
import {styles, colors} from '../../Common_styles';
import { FontFamily } from '../../GlobalStyles';
import mail from '../../../assets/rebook.png'
import Pop2 from '../start_screens/pop2';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { setvendorname,setvendorimg,setvendorid,setVendor } from '../../redux/booking';
import { da } from 'date-fns/locale';
import { backendURL } from '../../services/http';
import { formatDateToAgo } from '../../Functions';

const Late = ({data}) => {
    const [status,setStat]= useState()
    const [modalVisible, setModal] = React.useState(false);
    const [color,usecolor]= React.useState('#F9B015')
const dispatch= useDispatch()
const navigation= useNavigation()
    const handleCancel=async()=>{
       
       const info= await axios.post(`${backendURL}/booking/cancel?id=${data.data.id}&scope=user&noti_id=${data.id}}`)
       if( info.data.message=='cancelled'){
        setStat('You cancelled appointment')
       }
    }

    const handleRebook=()=>{
   dispatch(setvendorname(data.data.vendor.username))
    dispatch(setvendorimg(data.data.vendor.logo))
    dispatch(setvendorid(data.data.vendor.id))
    dispatch(setVendor(data.data.hours))
  
      navigation.navigate('SelectDate',{rebooked:true,id:data.data.id,noti_id:data.id})

    }
    return (
  <><Pressable onPress={() => usecolor('red')} style={{ backgroundColor: 'white', borderRadius: 20, paddingTop: 20, marginHorizontal: 20 }}>
            <View
                style={{
                    marginTop:20,
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 20,
                    gap: 10
                }}>
                <Image source={mail} style={{ marginTop: 10 }} />
                <View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row', gap: 5,
                    }}>
                        <View style={{ width: 9, height: 9, borderRadius: 50, backgroundColor: color, marginTop: 5 }}></View>
                        <Text style={[colors.dg,{fontFamily:FontFamily.sourceSansProBold,fontSize:17}]}>{data.title}</Text>
                        <Text style={{ position: 'absolute', right: 10, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: "#999999" }}>{formatDateToAgo(data.created_at)}</Text>
                    </View>
                    <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: "#999999", width: 300 }}>{status?status:data.body}</Text>
                   {
                    status? <Fragment/> :  <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 20 }}>
                    <Button onPress={handleCancel} buttonStyle={{ borderRadius: 40, backgroundColor: '#CD3D49', width: 120, height: 40 }} title='cancel'>

                    </Button>
                    <Button onPress={handleRebook} buttonStyle={{ borderRadius: 40, backgroundColor: colors.dg2.color, width: 120, height: 40 }} title='Rebook'>

                    </Button>
                </View>
                   }

                </View>
            </View>
        </Pressable><Pop2
                main={'You have Succesfully verified your Phone Number'}
                modal={modalVisible} /></>
    );
};

export default Late;
