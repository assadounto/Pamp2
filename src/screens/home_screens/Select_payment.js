import React, { useState } from "react";
import { SafeAreaView ,View,Text,Pressable} from "react-native";
import BHeader from "../../../components/BHeader";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { Icon,Button ,ListItem, color} from "@rneui/base";
import { Image } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import source from '../../../assets/pay-with-cash.png'
import source2 from '../../../assets/group-1902.png'
import checker from '../../../assets/check.png'
import add from '../../../assets/group-1756.png'
import { useSelector,useDispatch } from "react-redux";
import { setPayment } from "../../redux/user";
import { setDefault } from "../../redux/user";
const Select_payment=({navigation,route})=>{
  const {data}= route? route.params:{}

    const dispatch=useDispatch()
    const default_method= useSelector((state)=>state.user.payment_methods.default)
    const payment_methods=useSelector((state)=>state.user.payment_methods.methods)
    const truePrefs = Object.keys(data).filter(key => data[key]).map(key => `Pay with ${key}`);
    console.log(truePrefs,'hr')
    const isdefault= (name)=>{
      return default_method.name=== name
    }
   const payment_method=
    {
      'Pay with cash': '',
       'Pay with momo':'smartphone',
       'Pay with card': 'credit-card',
    }

    return(
  
            <ScrollView
            contentContainerStyle={{backgroundColor:'white',marginTop:40}}
            > 
                <BHeader title={'Payment methods'} color={colors.dg2.color} />
                <Text style={{width:320,marginBottom:20,marginHorizontal:40, textAlign:'left',fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:'#00463C'}}>Securely save your card details to seamlessly make payments.</Text>
                 {
                    payment_methods.filter((method)=>truePrefs.includes(method.name)).map((pay,index)=>
                    <View style={{marginHorizontal:30}}>
                        <ListItem
                  containerStyle={[{paddingVertical:30,borderBottomColor: index==payment_methods.length-1? colors.lg.color:null,borderBottomWidth:  index==payment_methods.length-1? 1: null, borderTopColor:colors.lg.color,borderTopWidth:1}]}
                  onPress={() => {
                  dispatch(setDefault(pay))
                  navigation.goBack()
                  }}>
                    {payment_method[pay.name]==''?
                       <Image
                       source={source}
                       style={{width:40 ,height:30,borderRadius:5,resizeMode:'contain'}}
                     />:
                       <Icon style={{marginLeft:5}} name={payment_method[pay.name]} color={colors.dg2.color}  type="feather"/> 
                    }
                 
      
                  <ListItem.Content>
                    <ListItem.Title style={colors.dgb}>
                     {pay.name && pay.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  {isdefault(pay.name) ? <Image  resizeMode="contain" style={{ width: 29,height:29,}} source={checker}/>:<ListItem.Chevron color={'#00463C'} size={30} />} 
                </ListItem>

                    </View>
                    )
                 }
                  {/* <View style={{marginHorizontal:30}}>
                        <ListItem
                  containerStyle={[{paddingVertical:30,borderTopColor:colors.lg.color,borderTopWidth:1}]}
                  onPress={() => {
                    navigation.navigate('Add_payment');
                  
                  }}>
                    <View style={{borderColor:colors.lg.color, padding: 5, borderRadius:7, borderWidth:1}}>
                    <Image
          source={add}
             style={{width:20,height:20}}  
        />
                    </View>
                 
                  <ListItem.Content>
                    <ListItem.Title style={colors.lg}>
                     Add new method
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={'#00463C'} size={30} />
                </ListItem>

                    </View> */}
       </ScrollView>
    
    )
}

export default Select_payment