import React ,{useMemo, useState}from "react"
import { View,Text,Pressable,Image,ImageBackground,SafeAreaView } from "react-native"
import MasonryList from '@react-native-seoul/masonry-list';
import { styles ,colors} from "../../Common_styles";
import { FontFamily } from "../../GlobalStyles";
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from "@rneui/base";
import Emptyfav from "../../../components/EmptyFav";
import axios from "axios";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { backendURL } from "../../services/http";
import { use } from "../../redux/homeapi";
import { TouchableOpacity } from "react-native-gesture-handler";
const data=[]
const data1= [
    {    
        id: 0,
        imgURL:
          'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
        text: 'Pioneer ',
      },
      {
        id: 1,
        imgURL:
          'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
        text: 'Precedant',
      },
      {
        id: 2,
        imgURL:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
        text: 'Leverette',
      },
      {
        id: 3,
        imgURL:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
        text: 'Briget',
      },
      {
        id: 4 ,
        imgURL:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
        text: 'Rivet',
      },
      {
        id: 5 ,
        imgURL:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
        text: 'Drew ',
      },
      
]
const Favourites=({navigation})=>{
  const user = useSelector((state)=>state.user.userInfo)
  const [data,setData]=useState([])
  React.useEffect(()=>{
getFav()
  },[])
    
  const getFav=async ()=>{
    try {
      const {data}= await axios.get(`${backendURL}/favorites?user_id=${user.id}`)
     
     let d= data&& data.map((item,id)=>{
        return {
          id: id,
          vendor:item.vendor,
          cover_image: item.cover_image,
          logo_image: item.logo_image
        }
      })
      setData(d)
    }
    catch (e){

    }
  }

    const item = ({item}) => (
        <TouchableOpacity onPress={()=>navigation.navigate('VendorDetail',
        {
        id: item.vendor.id,
        }
        )} style={{marginLeft:10 ,flex:1}}>
      <FastImage
  //imageStyle={{ borderRadius: 20 }}
  loadingIndicatorSource={require('../assets/edit.png')}
  source={{ uri: item.cover_image }}
  key={item.id}
  style={[{ borderRadius: 20, marginRight: 10, height: 200, marginTop: item.id == 0 ? 60 : 20, flex: 1 }]}
>
  <Icon
    onPress={() => console.log(item.id)}
    style={{ alignSelf: 'flex-end', margin: 10 }}
    name='heart'
    type="ionicon"
    color='white'
  />
  <LinearGradient
    colors={[
      'rgba(176, 235, 189,0.1)',
      'rgba(176, 235, 189,0.5)',
      'rgba(176, 235, 189,0.8)',
    ]}
    style={{ height: 60, position: 'relative', top: 95, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center' }}
  >
    <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
      <View style={{ borderRadius: 20, width: 27, height: 27, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <FastImage
          style={{
            borderRadius: 20,
            height: 22,
            width: 22,
          }}
          source={{
            uri: item.logo_image,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <Text
        style={{
          margin: 5,
          fontFamily: FontFamily.sourceSansProSemibold,
          fontSize: 12,
          color: 'white'
        }}
      >
        {item.vendor.username}
      </Text>
    </View>
  </LinearGradient>
</FastImage>

    </TouchableOpacity>
      );


    return(
      <SafeAreaView style={{flex:1}}>
   
        <Text style={{marginLeft:30,fontFamily:FontFamily.sourceSansProBold,fontSize:26,color:'#86D694',marginTop:30}}>My Fav</Text>
        {
          data.length==0? <Emptyfav 
          title={"No Favourites"}
          body={"You don't have any favourites yet"}
          top={150}
          />:
          <MasonryList
  data={data}
  keyExtractor={(item)=> item.id}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={item}
  //refreshing={isLoadingNext}
  onRefresh={() => getFav()}
  onEndReachedThreshold={0.1}
  //onEndReached={() => loadNext(ITEM_CNT)}
/>
        }

</SafeAreaView>
    )
}

export default Favourites