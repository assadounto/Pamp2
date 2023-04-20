import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView,StyleSheet,Image ,Pressable,FlatList} from 'react-native'
import LikkleSalonContainer from '../../../components/LikkleSalonContainer'
import { Icon,Input } from '@rneui/base'
import { colors } from '../../Common_styles'
import { FontFamily } from '../../GlobalStyles'
import { styles } from '../../Common_styles'
import RadioButton from '../../../components/RadioButton'

const Searches1 = ({navigation}) => {
  const [option, setOption] = React.useState('Recommended');
  const data2 = [
    { value: 'Recommended' },
    { value: 'Nearest' },
    { value: 'Newest' },
  ];
const data1 =[
  {
    image: '../../../assets/rectangle-9764.png',
    logo:'../../../assets/group-1820.png',
    name:'Likke Salon',
    items:[
      { value: 'Make up' },
    { value: 'Hair' },
    { value: 'Nails' },
    ],
    rating: '4.5',
    location:'Airport Resddf',
    dist: '2000m from you'
  },

]

const Item =({image,logo,name,items,rating,location,dist})=>(
  <View style={[styles2.cont,{shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 5,shadowOffset:{width:5,height:0},marginTop:10,marginBottom:10}]}>
    <Pressable  onPress={()=>navigation.navigate('VendorDetail')}>  
    <Image
    source={require('../../../assets/rectangle-9764.png')}
    style={{ alignSelf:'center',width: '100%',  borderRadius: 20 }
    
  }

 />
 </Pressable>

  <Image
    source={require('../../../assets/group-1820.png')}
 
  style={{ width: 60, height: 69,position:'relative',top:-30,left:15}} 
    />
  <View style={{width: 60,position:'relative',left:220,top:-90,backgroundColor:'white',display:'flex',flexDirection:'row',width:74,height:44,alignItems:'center',borderRadius:40,hadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.84,

        elevation: 8,
   justifyContent:'center'
}}> 
    <Icon
    name='star'
    type='ionicons'
    color={colors.lg.color
    
    
    }
    />
    <Text>
      {rating}
    </Text>
  </View>
  <View style={{position:'relative',top:-80}}>
  <Text style={{marginBottom:15, fontFamily:FontFamily.sourceSansProBold,fontSize:24,fontWeight:'bold',color:colors.dg.color}}>{name}</Text>
  <View style={{display:'flex',flexDirection:'row'}}>  
  {items.map((item) => {
    return (
    
      <Pressable
        style={
          {
            backgroundColor: 'white',
            borderRadius: 20,
            height:34,
            padding:8,
            marginBottom:15,
            borderColor:'#B0EBBD',
            borderWidth: 1,
          marginRight:10
          }
        }
        onPress={() => selectHandler(item.value)}>
        <Text style={[styles.option, colors.dg]}> {item.value}</Text>
      </Pressable>
   
    );
  })}
</View>
  <Text style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:18,color:'#00463C',marginBottom:15}}> {location}</Text>
  <View style={{display:'flex',flexDirection:'row'}}>
    <Icon name='location-outline' type='ionicon' color={colors.lg.color} />
    <Text style={{color:colors.lg.color,fontFamily:FontFamily.sourceSansProSemibold,fontSize:16}}> {dist}</Text>
  </View>

</View>
</View>
);


  return (

    <View style={{backgroundColor: 'white'}}>
   <Input
        placeholder="Search for a service"
        inputContainerStyle={[styles.textInput, styles.tc,{marginTop:50,paddingTop:10}]}
        leftIcon={<Icon name="chevron-back" type="ionicon" color={'#BCC4CC'}  size={30}/>}
        //onFocus={() => }
        value ={'East Legon'}
      />
  <RadioButton data={data2} onSelect={(value)=>setOption('Recommeded')}/>

  <Text style={{fontFamily:FontFamily.sourceSansProBold, fontSize:24,color:colors.dgb.color, marginLeft:40, fontWeight:'bold'}}>{data1.length} resuts For Hair Salon </Text>
  <Text style={{fontFamily:FontFamily.sourceSansProBold, fontSize:24,color:colors.dgb.color, marginLeft:40,fontWeight:'bold'}}>near you </Text>
  <FlatList style={{marginBottom:300}}
        data={data1}
        renderItem={({item}) => (
          <Item  
           name={item.name} id={item.id}   logo={item.logo}   items={item.items} rating={item.rating} location={item.location} dist={item.dist} image={item.image}/>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles2= StyleSheet.create({
  cont:{
    height:430,
    backgroundColor:'white',
    padding:20,
    width: '90%',
    alignSelf: 'center',
    borderRadius:20
  }

})
export default Searches1
