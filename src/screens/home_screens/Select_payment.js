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
import add from '../../../assets/group-1756.png'
import { useSelector,useDispatch } from "react-redux";
import { setPayment } from "../../redux/user";
import { setDefault } from "../../redux/user";
const Select_payment=({navigation})=>{
    const dispatch=useDispatch()
    const payment_methods=useSelector((state)=>state.user.payment_methods.methods)
   const payment_method=[
    {   id:1,
        name: 'Pay with cash',
        img: source
    },
    {
        id:2,
        name: 'Pay with Mobile Money',
        img: source
    },
    {
        id:3,
        name: 'Master',
        expiry: '5/27',
        img:source2
    }
   ]
    return(
        <SafeAreaView>
            <ScrollView
            contentContainerStyle={{backgroundColor:'white'}}
            > 
                <BHeader title={'Payment methods'}/>
                <Text style={{width:320,marginBottom:20,marginHorizontal:40, textAlign:'left',fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:'#00463C'}}>Securely save your card details to seamlessly make payments.</Text>
                 {
                    payment_methods.map((pay)=>
                    <View style={{marginHorizontal:30}}>
                        <ListItem
                  containerStyle={[{paddingVertical:30,borderTopColor:colors.lg.color,borderTopWidth:1}]}
                  onPress={() => {
                  dispatch(setDefault(pay))
                  navigation.replace('Confirm')
                  }}>
                    
                  <Image
          source={pay.img=='cash'? source: 'master'? source2:null}
          style={{}}
        />
                  <ListItem.Content>
                    <ListItem.Title style={colors.dgb}>
                     {pay.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={'#00463C'} size={30} />
                </ListItem>

                    </View>
                    )
                 }
                  <View style={{marginHorizontal:30}}>
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
                     Add new card
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={'#00463C'} size={30} />
                </ListItem>

                    </View>
       </ScrollView>
        </SafeAreaView>
    )
}

export default Select_payment