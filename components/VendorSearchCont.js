import { Icon,Input } from '@rneui/base'
import { FontFamily } from '../GlobalStyles'
import { View, Text, ScrollView,StyleSheet,Image ,Pressable,FlatList, Alert} from 'react-native'
import FastImage from 'react-native-fast-image'
import { styles,colors } from '../src/Common_styles'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Emptyfav from './EmptyFav'
const Tab = createMaterialTopTabNavigator();

const VendorSearchCon=({datas,notext,navigation,category})=>{
console.log(datas, typeof(datas))
  function generateRatingsSummary(ratings) {
  
    // Initial template
    let summary = {
      total_ratings: ratings.length,
      ratings: {
        "5": 0,
        "4": 0,
        "3": 0,
        "2": 0,
        "1": 0,
      },
      average_rating: 0.0,
    };

    // Iterate through ratings to populate the summary
    let totalScore = 0;
    for (let i = 0; i < ratings.length; i++) {
      let ratingValue = ratings[i].rating.toString();
      if (summary.ratings[ratingValue] !== undefined) {
        summary.ratings[ratingValue] += 1;
        totalScore += ratings[i].rating;
      }
    }

    // Calculate average rating
    if (ratings.length !== 0) {
      summary.average_rating = parseFloat(
        (totalScore / ratings.length).toFixed(2)
      );
    }

    console.log(summary, "xcxcxc");

    // Return the summary
    return summary;
  }

const Item =({image,logo,name,items,location,dist,id,ratings})=>(
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
        {ratings.average_rating==0?'0.0':ratings.average_rating}
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
         >
          <Text style={[styles.option, colors.dg]}> {item.value}j</Text>
        </Pressable>
     
      );
    })}
  </View>
    <Text style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:18,color:'#00463C',marginBottom:15}}> {location}</Text>
    <View style={{display:'flex',flexDirection:'row'}}>
      <Icon name='location-outline' type='ionicon' color={colors.lg.color} />
      <Text style={{color:colors.lg.color,fontFamily:FontFamily.sourceSansProSemibold,fontSize:16}}> {parseInt(dist)}m from you</Text>
    </View>
  
  </View>
  </View>
  );
   return (
    <>
    {datas && datas.length!==0 ?
            <>
            {
              !notext &&<><Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 24, color: colors.dg.color, marginLeft: 40, fontWeight: 'bold', }}>{datas.length} {datas.length > 1 ? 'results' : 'result'} For {category}</Text><Text style={{ marginBottom: 20, fontFamily: FontFamily.sourceSansProBold, fontSize: 24, color: colors.dgb.color, marginLeft: 40, fontWeight: 'bold' }}>near you </Text></>
            }
            <FlatList
           data={datas}
           renderItem={({ item }) => (
             <Item
              ratings={generateRatingsSummary(item.ratings)}
               name={item.name} id={item.id} logo={item.logo} items={item.items} rating={item.rating} location={item.location} dist={item.dist} image={item.image} />
           )}
           keyExtractor={item => item.id} /></>: <Emptyfav 
  title={"No match"}
  body={"Nothing here to show"}
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