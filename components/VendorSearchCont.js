import { Icon,Input } from '@rneui/base'
import { FontFamily } from '../GlobalStyles'
import { View, Text, ScrollView,StyleSheet,Image ,Pressable,FlatList} from 'react-native'
import FastImage from 'react-native-fast-image'
import { styles,colors } from '../src/Common_styles'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Emptyfav from './EmptyFav'
const Tab = createMaterialTopTabNavigator();

const VendorSearchCon=({data,navigation})=>{
  
const Item =({image,logo,name,items,rating,location,dist,id})=>(
    <View style={[styles2.cont,{shadowColor: '#707070',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    shadowOffset: {width: 5, height: 0},marginTop:10,marginBottom:10}]}>
      <Pressable  onPress={()=>navigation.navigate('VendorDetail',
      {
      id: id,
      }
      )}>  
     <FastImage
      source={{uri: image, headers: { Authorization: 'someAuthToken' },
      priority: FastImage.priority.normal,}}
     
      style={{ alignSelf:'center',width: '100%', height:200, borderRadius: 20 }
      
    }
  
   />
   </Pressable>
    
   <View 
style={{
  padding: 5,
  borderRadius: 50,
  backgroundColor: 'white',
  width: 60,
  height: 60,
  position: 'relative',
  top: -30,
  left: 15,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 4,
}}
      >
        <FastImage
                       style={{borderRadius: 50, width: 50, height: 50, }} 

          source={{
            uri: logo,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover} />
          </View>


    <View style={{width: 60,position:'absolute',right:30,top:200,backgroundColor:'white',display:'flex',flexDirection:'row',width:74,height:44,alignItems:'center',borderRadius:40,hadowColor: "#000",
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
    <View style={{position:'relative',top:-30}}>
    <Text style={{marginBottom:15, fontFamily:FontFamily.sourceSansProBold,fontSize:24,fontWeight:'bold',color:colors.dg.color}}>{name}</Text>
    <View style={{display:'flex',flexDirection:'row'}}>  
    {items.map((item) => {
      return (
      
        <Pressable
          style={
            {
              backgroundColor: 'white',
              borderRadius: 15,
              height:34,
              padding:8,
              marginBottom:15,
              paddingHorizontal:16,
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
    <>
    {data && data.length!==0 ?
    <FlatList 
    data={data}
    renderItem={({item}) => (
      <Item  
       name={item.name} id={item.id}   logo={item.logo}   items={item.items} rating={item.rating} location={item.location} dist={item.dist} image={item.image}/>
    )}
    keyExtractor={item => item.id}
  />: <Emptyfav 
  title={"No match"}
  body={"Please try different keywords"}
  top={50}
  />}
  </>
   )
}

export default VendorSearchCon

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